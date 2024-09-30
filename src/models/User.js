// /models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  walletBalance: {
    // Added wallet balance field
    type: Number,
    default: 0,
  },
});

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
