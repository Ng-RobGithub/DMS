const {
  CustomerStatement,
  InvoiceList,
  Invoice,
  ReportByProducts
} = require('../models/reports');

exports.getCustomerStatements = async (req, res) => {
  try {
    const customerStatements = await CustomerStatement.find();
    res.json(customerStatements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInvoiceLists = async (req, res) => {
  try {
    const invoiceLists = await InvoiceList.find();
    res.json(invoiceLists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Define more controller functions as needed
