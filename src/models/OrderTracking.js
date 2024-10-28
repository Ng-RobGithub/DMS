const mongoose = require('mongoose');

const OrderTrackingSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  currentStatus: { type: String, required: true },
  statusHistory: [
    {
      status: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('OrderTracking', OrderTrackingSchema);
