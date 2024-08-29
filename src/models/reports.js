const mongoose = require('mongoose');

// Schema for Customer Statement
const CustomerStatementSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  }
});

// Schema for Invoice List
const InvoiceListSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  }
});

// Schema for Invoice
const InvoiceSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  }
});

// Schema for Report by Products
const ReportByProductsSchema = new mongoose.Schema({
  // Define fields as needed
});

const CustomerStatement = mongoose.model('CustomerStatement', CustomerStatementSchema);
const InvoiceList = mongoose.model('InvoiceList', InvoiceListSchema);
const Invoice = mongoose.model('Invoice', InvoiceSchema);
const ReportByProducts = mongoose.model('ReportByProducts', ReportByProductsSchema);

module.exports = {
  CustomerStatement,
  InvoiceList,
  Invoice,
  ReportByProducts
};
