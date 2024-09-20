const express = require('express');
const { processFlutterwavePayment } = require('../controllers/flutterwavePaymentController');
const router = express.Router();

// Flutterwave Payment
router.post('/flutterwave', processFlutterwavePayment);

module.exports = router;
