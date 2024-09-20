const paypal = require('paypal-rest-sdk');
const User = require('../models/User'); // Adjust the path as needed

// PayPal Configuration
paypal.configure({
  mode: 'sandbox', // 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

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

// PayPal Payment Processing
exports.processPayPalPayment = (req, res) => {
  const { amount, currency } = req.body;
  const userId = req.user.id;

  const create_payment_json = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    transactions: [{ amount: { total: amount, currency }, description: 'Payment for wallet recharge' }],
    redirect_urls: {
      return_url: 'http://your-site.com/success',
      cancel_url: 'http://your-site.com/cancel',
    },
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error('PayPal Payment Error:', error);
      res.status(500).json({ success: false, message: error.response });
    } else {
      if (payment.payer.status === 'VERIFIED') {
        updateWalletBalance(userId, amount)
          .then((updated) => {
            if (updated) {
              res.status(200).json({ success: true, message: 'Payment successful!' });
            } else {
              res.status(500).json({ success: false, message: 'Failed to update wallet balance.' });
            }
          });
      }
    }
  });
};
