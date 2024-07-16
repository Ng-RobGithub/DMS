const express = require('express');
const router = express.Router();
const { createCustomerStatement } = require('../controllers/reportsController');

// Route to create a customer statement
router.post('/customer-statement', createCustomerStatement);

// Define routes for InvoiceList, Invoice, and ReportByProducts similarly

module.exports = router;
