const express = require('express');
const { processQuicktellerPayment } = require('../controllers/quicktellerPaymentController');
const router = express.Router();

// Quickteller Payment
router.post('/quickteller', processQuicktellerPayment);

module.exports = router;
