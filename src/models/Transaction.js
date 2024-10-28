const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
      required: true,
    },

    paystackReference: {
      type: String,
      unique: true,
    },

    amount: {
      type: Number,
      default: 0,
    },

    status: {
      enum: ['Active', 'Pending', 'Completed'],
      default: 'Pending',
    },

    metaData: {
      type: Object,
    },

    currency: {
      type: String,
    },

    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Transaction', TransactionSchema);
