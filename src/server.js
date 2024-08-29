// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const winston = require('winston');
const passport = require('passport');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { sessionMiddleware } = require('./middleware/authMiddleware');
require('./config/passportConfig'); // Import passport configuration

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
const requiredEnvVars = ['JWT_SECRET', 'PORT', 'FRONTEND_URL', 'MONGO_URI', 'SESSION_SECRET'];
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

const app = express();

// Use CORS middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Ensure this matches your frontend URL
    credentials: true,
    optionsSuccessStatus: 200
}));

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use session middleware
app.use(sessionMiddleware);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/delivery', require('./routes/deliveryRoutes'));

// Catchall handler for React routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app; // Export the app instance
