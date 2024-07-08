const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [CartItemSchema],
  deliveryDetails: {
    deliveryMethod: { type: String },
    country: { type: String },
    state: { type: String },
    registeredAccount: { type: String },
    plantDepot: { type: String },
    paymentReference: { type: String },
    paymentDate: { type: Date },
    deliveryDate: { type: Date },
    truckSize: { type: String },
    deliveryAddress: { type: String },
    deliveryState: { type: String },
    region: { type: String },
    salesManager: { type: String }
  },
  status: { type: String, enum: ['pending', 'saved', 'submitted'], default: 'pending' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
