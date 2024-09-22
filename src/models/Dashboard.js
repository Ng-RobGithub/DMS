const mongoose = require('mongoose');

// Define the Dashboard schema
const DashboardSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true  // Indexed for fast user-based queries
  },
  totalWalletBalance: { 
    type: Number, 
    default: 0, 
    min: 0  // Ensure non-negative balance
  },
  availableBalance: { 
    type: Number, 
    default: 0, 
    min: 0  // Ensure non-negative available balance
  },
  orders: {
    new: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    submitted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true  // Automatically manages createdAt and updatedAt
});

// Custom method to calculate the total wallet balance
DashboardSchema.methods.calculateTotalWalletBalance = function() {
  // You can add any logic here if bonuses or other amounts are factored into the total wallet balance
  return this.totalWalletBalance;
};

// Export the Dashboard model
module.exports = mongoose.model('Dashboard', DashboardSchema);
