// src/models/authModel.js
// models/auth.js

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
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
  expireAfterSeconds: 604800, // Token expires after 7 days (7*24*60*60 seconds)
});

// Ensure the token expires after 7 days
AuthSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

module.exports = mongoose.model('Auth', AuthSchema);
