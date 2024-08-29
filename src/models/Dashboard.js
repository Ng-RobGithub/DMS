const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ledgerBalance: { type: Number, default: 0 },
  availableBalance: { type: Number, default: 0 },
  orders: {
    new: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    submitted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
