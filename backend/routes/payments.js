const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51PoUtiH8wl4X9pVrOd7Z1NMDyYs6uf4LeC0f7KrHjElPCdbytktosCF9TMZ0eFdpwcJJCwe0WPrdQt6goPEm76gT00pb1xlT0k");

router.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, 
            currency: 'usd',
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: 'Payment failed' });
    }
});

module.exports = router;