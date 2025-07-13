const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createStripePaymentIntent = async (req, res) => {
  const { amount, currency = 'inr', receiptEmail } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // in paise
        currency,
        receipt_email: receiptEmail,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe PI creation error:', err);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};