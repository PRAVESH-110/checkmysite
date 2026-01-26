

import Razorpay from "razorpay";

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_API_KEY,
    key_secret: process.env.RAZORPAY_TEST_SECRET_KEY
});
