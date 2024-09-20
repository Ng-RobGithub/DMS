const Wallet = require('../models/Wallet.js');
const { validationResult } = require('express-validator');

// @desc     Get the current wallet balance
// @access   Private
exports.getWalletBalance = async (req, res) => {
  try {
    // Find the wallet for the logged-in user
    const wallet = await Wallet.findOne({ user: req.user.id });

    if (!wallet) {
      return res.status(404).json({ msg: 'Wallet not found' });
    }

    res.json({
      totalWalletBalance: wallet.totalWalletBalance,  // Updated field name
      availableBalance: wallet.availableBalance
    });
  } catch (err) {
    console.error('Error fetching wallet balance:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc     Update the wallet balance
// @access   Private
exports.updateWalletBalance = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount } = req.body; // Amount to update the balance by

  // Validate amount
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ msg: 'Invalid amount' });
  }

  try {
    // Find the wallet for the logged-in user
    let wallet = await Wallet.findOne({ user: req.user.id });

    if (!wallet) {
      return res.status(404).json({ msg: 'Wallet not found' });
    }

    // Update the wallet balance
    wallet.availableBalance += amount; // Adjust as needed
    wallet.totalWalletBalance += amount; // Updated field name
    await wallet.save();

    res.json({
      totalWalletBalance: wallet.totalWalletBalance,  // Updated field name
      availableBalance: wallet.availableBalance
    });
  } catch (err) {
    console.error('Error updating wallet balance:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
