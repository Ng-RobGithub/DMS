const mongoose = require('mongoose');

// Define the Dashboard schema
const DashboardSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true  // Add an index for performance
  },
  totalWalletBalance: { 
    type: Number, 
    default: 0, 
    min: 0  // Ensure total wallet balance is non-negative
  },
  availableBalance: { 
    type: Number, 
    default: 0, 
    min: 0  // Ensure available balance is non-negative
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
  timestamps: true  // Automatically add createdAt and updatedAt fields
});

// Custom method to calculate the total wallet balance
DashboardSchema.methods.calculateTotalWalletBalance = function() {
  return this.totalWalletBalance;
};

// Export the Dashboard model
module.exports = mongoose.model('Dashboard', DashboardSchema);
