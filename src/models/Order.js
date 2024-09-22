const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  parentOrderNumber: { type: String,},
  totalAmount: { type: Number },
  paymentReference: { type: String },
  paymentDate: { type: Date },
  deliveryDate: { type: Date },
  truckSize: { type: String },
  deliveryAddress: { type: String },
  deliveryState: { type: String },
  deliveryCountry: { type: String },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Saved'] },
});


module.exports = mongoose.model('Order', orderSchema);


