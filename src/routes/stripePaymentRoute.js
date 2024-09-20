// src/routes/stripePaymentRoute.js
const express = require('express');
const { processStripePayment } = require('../controllers/stripePaymentController');
const router = express.Router();

// Stripe Payment
router.post('/stripe', processStripePayment);

module.exports = router;
