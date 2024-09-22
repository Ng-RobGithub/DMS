const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Ensure this is correctly implemented
const Order = require('../models/Order'); // Import your Order model

router.post('/checkout', protect, async (req, res) => {
  const {
    paymentReference,
    paymentDate,
    deliveryDate,
    truckSize,
    deliveryAddress,
    deliveryState,
    deliveryCountry,
  } = req.body; // No need to include totalAmount if it's unused

  // Validate the required fields
  if (!paymentReference || !paymentDate || !deliveryDate || !truckSize || !deliveryAddress || !deliveryState || !deliveryCountry) {
    return res.status(400).json({ message: 'Please fill in all the required fields' });
  }

  try {
    const userId = req.user.id;

    // Generate parentOrderNumber
    const parentOrderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;

    // Create a new order
    const newOrder = new Order({
      user: userId,
      paymentReference,
      paymentDate,
      deliveryDate,
      truckSize,
      deliveryAddress,
      deliveryState,
      deliveryCountry,
      parentOrderNumber,  // Make sure this is used and saved
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: newOrder._id,
      parentOrderNumber,  // Include in the response
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
