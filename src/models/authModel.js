// src/models/authModel.js

const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '7d', // Token expires after 7 days
  },
});

module.exports = mongoose.model('Auth', AuthSchema);
