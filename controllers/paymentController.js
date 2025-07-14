// const Stripe = require('stripe');
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// exports.createStripePaymentIntent = async (req, res) => {
//   const { amount, currency = 'inr', receiptEmail } = req.body;
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: amount * 100, // in paise
//         currency,
//         receipt_email: receiptEmail,
//     });
//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (err) {
//     console.error('Stripe PI creation error:', err);
//     res.status(500).json({ error: 'Failed to create payment intent' });
//   }
// };


const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createStripePaymentIntent = async (req, res) => {
  const { amount, currency = 'usd', receiptEmail } = req.body;

  try {
    // Ensure amount is a valid number
    const parsedAmount = Math.round(Number(amount) * 100); // e.g., 20 USD → 2000 cents

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount provided' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parsedAmount,
      currency,
      receipt_email: receiptEmail || 'test@example.com', // optional fallback
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe PI creation error:', err);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};
