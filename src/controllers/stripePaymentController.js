// backend/controllers/stripePaymentController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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

// Stripe Payment Processing
exports.processStripePayment = async (req, res) => {
  const { paymentMethodId, amount, currency } = req.body;
  const userId = req.user.id; // Assuming you have authentication and user info

  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency,
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Check if the payment was successful
    if (paymentIntent.status === 'succeeded') {
      // Update the wallet balance if payment succeeded
      const updated = await updateWalletBalance(userId, amount / 100); // Convert cents to dollars
      if (updated) {
        res.status(200).json({ success: true, message: 'Payment successful!' });
      } else {
        res.status(500).json({ success: false, message: 'Failed to update wallet balance.' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Payment not successful.' });
    }
  } catch (error) {
    console.error('Stripe Payment Error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
