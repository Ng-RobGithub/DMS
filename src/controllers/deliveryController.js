// controllers/deliveryController.js

const Order = require('../models/Order'); // Order model
const { v4: uuidv4 } = require('uuid'); // UUID for generating unique order numbers

// Checkout function to create a new order
exports.checkout = async (req, res) => {
    try {
        const { 
            paymentReference, paymentDate, deliveryDate, 
            truckSize, deliveryAddress, deliveryState, 
            deliveryCountry, totalAmount
        } = req.body;

        // Validation: Check if all fields are provided
        if (!paymentReference || !paymentDate || !deliveryDate || !truckSize || !deliveryAddress || !deliveryState || !deliveryCountry || !totalAmount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Simulating a user from session (replace this with actual user data)
        const userId = req.user ? req.user.id : 'dummy-user-id'; // Replace with actual user session

        // Generate a unique parentOrderNumber using UUID
        const parentOrderNumber = `ORD-${uuidv4().slice(0, 8).toUpperCase()}`;

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
            totalAmount,
            parentOrderNumber
        });

        // Save order to the database
        const savedOrder = await newOrder.save();

        // Respond with the created order
        return res.status(201).json({
            success: true,
            message: 'Order successfully created',
            order: savedOrder
        });
    } catch (error) {
        console.error('Checkout error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
