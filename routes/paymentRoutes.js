const express = require('express');
const { createStripePaymentIntent } = require('../controllers/paymentController');
const router = express.Router();

router.post('/stripe-payment-intent', createStripePaymentIntent);

module.exports = router;