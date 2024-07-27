const express = require('express');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();
const app = require('./app'); // Import the app setup

const app = express();

// Database connection
connectDB();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
}));

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Define API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/delivery', require('./routes/deliveryRoutes'));
app.use('/api/otp', require('./routes/otpRoutes')); // Use the combined OTP routes

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
