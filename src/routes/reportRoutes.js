const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

// Define the routes for reports
router.get('/customer-statements', reportsController.getCustomerStatements);
router.get('/invoice-lists', reportsController.getInvoiceLists);

// Define more routes as needed

module.exports = router;
