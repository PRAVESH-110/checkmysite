import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import crypto from "crypto";
import { razorpay } from "../razorpayconfig/instance.js";
import { Order } from "../model/model.order.js"
import { User } from "../model/model.user.js"

const orderRouter = express.Router()

orderRouter.post("/payment/create-order", authMiddleware, async (req, res) => {
    const { planId } = req.body;
    const userId = req.userId;

    // Example pricing logic (in cents)
    const plans = {
        Basic: 2900,
        Pro: 7900,
    };

    const amount = plans[planId];
    if (!amount) {
        return res.status(400).json({ message: "Invalid plan" });
    }

    try {
        const order = await razorpay.orders.create({
            amount,
            currency: "USD",
            receipt: `receipt_${Date.now()}`,
        });

        // Create Order in DB
        await Order.create({
            userId,
            plan: planId,
            amount,
            currency: "USD",
            razorpayOrderId: order.id,
            status: "created"
        });

        res.status(200).json(order);
    } catch (error) {
        console.error("Razorpay error:", error);
        res.status(500).json({ message: "Payment initialization failed" });
    }
});

orderRouter.post("/payment/verify", async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_TEST_SECRET_KEY) // Make sure to use correct env var
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Payment verification failed"
        });
    }

    try {
        // 1. Find the order
        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // 2. Update Order Status
        order.paymentId = razorpay_payment_id;
        order.razorpaySignature = razorpay_signature;
        order.status = "paid";
        await order.save();

        // 3. Update User Plan
        await User.findByIdAndUpdate(order.userId, {
            plan: order.plan
        });

        res.json({ success: true, message: "Payment successful, plan updated" });
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default orderRouter;
