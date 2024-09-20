const express = require('express');
const winston = require('winston');
const passport = require('passport');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler.js');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // CORS for cross-origin handling
const path = require('path'); // Path for serving React build
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');

// Import delivery routes
const deliveryRoutes = require('./routes/deliveryRoutes');

// Payment Route Imports
const stripePaymentRoute = require('./routes/stripePaymentRoute');
const paypalPaymentRoute = require('./routes/paypalPaymentRoute');
const flutterwavePaymentRoute = require('./routes/flutterwavePaymentRoute');
const quicktellerPaymentRoute = require('./routes/quicktellerPaymentRoute');

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// Debugging environment variables (only in development mode)
if (process.env.NODE_ENV === 'development') {
    console.log('Environment Variables:');
    ['MONGO_URI', 'JWT_SECRET', 'PORT', 'FRONTEND_URL', 'SESSION_SECRET'].forEach((envVar) => {
        console.log(`${envVar}:`, process.env[envVar]);
    });
}

// Verify required environment variables
const requiredEnvVars = ['JWT_SECRET', 'PORT', 'FRONTEND_URL', 'MONGO_URI'];
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        logger.error(`${envVar} is not defined in the environment variables.`);
        process.exit(1);
    }
});

// Database connection
(async () => {
    try {
        await connectDB(); // Ensure this function uses process.env.MONGO_URI
        logger.info('Database connected successfully');
    } catch (err) {
        logger.error('Database connection error:', err.message);
        process.exit(1);
    }
})();

const app = express(); // Initialize Express app

// Use CORS middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}));

// Init Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Use cookie-parser middleware (if needed for any cookie-based functionality)
app.use(cookieParser());

// Initialize Passport (for JWT-based authentication)
app.use(passport.initialize()); // Initialize Passport middleware

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/orders', require('./routes/orders'));
app.use('/api/wallet', require('./routes/wallet'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/delivery', deliveryRoutes); // Use imported deliveryRoutes

// Payment Routes
app.use('/api/payments/stripe', stripePaymentRoute);
app.use('/api/payments/paypal', paypalPaymentRoute);
app.use('/api/payments/flutterwave', flutterwavePaymentRoute);
app.use('/api/payments/quickteller', quicktellerPaymentRoute);

// Centralized error handling middleware
app.use(errorHandler);

// Catchall handler for React routes (move this to the end)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = app; // Export the app instance
