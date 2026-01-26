import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Types.ObjectId
    },
    plan: {
        type: String,
        enum: ["Basic", "Pro", "Free"],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number, // stored in smallest unit (paise / cents)
        required: true
    },

    currency: {
        type: String,
        default: "INR"
    },

    razorpayOrderId: {
        type: String,
        required: true
    },

    razorpayPaymentId: {
        type: String
    },

    razorpaySignature: {
        type: String
    },

    status: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created"
    },
},
    {
        timestamps: true
    }
);
export const Order = mongoose.model('Order', orderSchema)