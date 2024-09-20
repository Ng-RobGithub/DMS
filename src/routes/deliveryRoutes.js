const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Include your auth middleware
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

// Route to get states based on country
router.get('/states/:country', (req, res) => {
  const country = req.params.country;
  res.json(states[country] || []);
});

// Route to create a new delivery order
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
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  try {
    // Assuming req.user contains the authenticated user's info from the protect middleware
    const userId = req.user.id;

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
