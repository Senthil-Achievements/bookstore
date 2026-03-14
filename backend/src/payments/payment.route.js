const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
    try {
        const { price } = req.body;

        // Stripe expects amounts in cents, so we multiply the dollar amount by 100
        const amount = Math.round(price * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error("Error creating payment intent", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
