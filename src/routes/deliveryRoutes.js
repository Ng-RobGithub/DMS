const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Ensure this is correctly implemented
const Order = require('../models/Order'); // Import your Order model

// Example data for countries and states
const countries = ['Nigeria'];
const states = {
  'Nigeria': ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Delta', 'Rivers', 'Cross River', 'Lagos', 'Imo'],
};

// Route to get countries
router.get('/countries', (req, res) => {
  res.json(countries);
});

// Route to get states based on the country
router.get('/states/:country', (req, res) => {
  const country = req.params.country;
  if (states[country]) {
    res.json(states[country]);
  } else {
    res.status(400).json({ message: 'Country not found' });
  }
});

/**
 * @route   POST /api/delivery/checkout
 * @desc    Create a new delivery order
 * @access  Private (Protected route using token-based auth)
 */
router.post('/checkout', protect, async (req, res) => {
  const {
    paymentReference,
    paymentDate,
    deliveryDate,
    truckSize,
    deliveryAddress,
    deliveryState,
    deliveryCountry
  } = req.body;

  // Validate the required fields
  if (!paymentReference || !paymentDate || !deliveryDate || !truckSize || !deliveryAddress || !deliveryState || !deliveryCountry) {
    return res.status(400).json({ message: 'Please fill in all the required fields' });
  }

  try {
    const userId = req.user.id; // Get user ID from token

    // Create a new order
    const newOrder = new Order({
      user: userId,
      paymentReference,
      paymentDate,
      deliveryDate,
      truckSize,
      deliveryAddress,
      deliveryState,
      deliveryCountry
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: newOrder._id
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
