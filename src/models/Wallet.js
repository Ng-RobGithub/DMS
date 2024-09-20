const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalWalletBalance: {  // Updated field name
    type: Number,
    default: 0,
    min: 0  // Ensure total balance is non-negative
  },
  availableBalance: {
    type: Number,
    default: 0,
    min: 0  // Ensure available balance is non-negative
  }
}, {
  timestamps: true  // Add createdAt and updatedAt fields
});

module.exports = mongoose.model('Wallet', WalletSchema);
