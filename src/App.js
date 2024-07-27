const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const reportsRoutes = require('./routes/reportsRoutes');
const productRoutes = require('./routes/productRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const userRoutes = require('./routes/userRoutes');
const otpRoutes = require('./routes/otpRoutes'); // Import the combined OTP routes
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Connect Database
connectDB();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL if needed
}));

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/otp', otpRoutes); // Use the combined OTP routes

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
