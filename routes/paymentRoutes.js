// const express = require('express');
// const { createStripePaymentIntent } = require('../controllers/paymentController');
// const router = express.Router();

// router.post('/stripe-payment-intent', createStripePaymentIntent);

// module.exports = router;



// Using RAZORPAY
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Route: Create Razorpay Order
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency: currency || "INR",
      payment_capture: 1, // auto capture after payment success
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);
    return res.status(500).json({ error: "Failed to create order" });
  }
});

// ✅ Route: Verify Razorpay Payment
router.post("/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Generate signature using Razorpay secret
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      console.log("✅ Payment verified successfully!");
      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      console.log("⚠️ Payment verification failed!");
      return res.status(400).json({ success: false, message: "Invalid signature, verification failed" });
    }
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    return res.status(500).json({ success: false, message: "Server error during verification" });
  }
});

module.exports = router;
