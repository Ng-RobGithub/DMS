const express = require('express');
const { processPayPalPayment } = require('../controllers/paypalPaymentController');
const router = express.Router();

// PayPal Payment
router.post('/paypal', processPayPalPayment);

module.exports = router;
