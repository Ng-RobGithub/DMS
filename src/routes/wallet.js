const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js'); // Import middleware for authentication
const walletController = require('../controllers/walletController.js'); // Import the wallet controller

// GET /api/v1/wallet
// @desc     Get the current wallet balance
// @access   Private
router.get('/', protect, walletController.getWalletBalance);

// POST /api/v1/wallet/update
// @desc     Update the wallet balance
// @access   Private
router.post('/update', protect, walletController.updateWalletBalance);

module.exports = router;
