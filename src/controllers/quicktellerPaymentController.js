const axios = require('axios');
const User = require('../models/User'); // Adjust the path as needed

// Function to update user's wallet balance
const updateWalletBalance = async (userId, amount) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.walletBalance += amount;
      await user.save();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating wallet balance:', error);
    return false;
  }
};

// Quickteller Payment Processing
exports.processQuicktellerPayment = async (req, res) => {
  const { amount, currency, customer_id } = req.body;
  const userId = req.user.id;

  try {
    const response = await axios.post(
      'https://api.quickteller.com/v2/transactions/initiate',
      {
        amount,
        currency,
        customer_id,
        payment_code: 'Payment Code',
        description: 'Payment for wallet recharge',
      },
      { headers: { Authorization: `Bearer ${process.env.QUICKTELLER_SECRET_KEY}` } }
    );

    if (response.data.status === 'SUCCESSFUL') {
      const updated = await updateWalletBalance(userId, amount);
      if (updated) {
        res.status(200).json({ success: true, message: 'Payment successful!' });
      } else {
        res.status(500).json({ success: false, message: 'Failed to update wallet balance.' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Payment not successful.' });
    }
  } catch (error) {
    console.error('Quickteller Payment Error:', error);
    res.status(500).json({ success: false, message: error.response.data });
  }
};
