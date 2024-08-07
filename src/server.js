require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const winston = require('winston');
const passport = require('passport');
const connectDB = require('./config/db'); // Ensure this path is correct
const errorHandler = require('./middleware/errorHandler');
const { sessionMiddleware, protect } = require('./middleware/authMiddleware');
require('./config/passportConfig'); // Import passport configuration
const authRoutes = require('./routes/authRoutes'); // Adjust the path as needed


// Debugging environment variables
console.log('MONGO_URI:', process.env.MONGO_URI); // Should print MongoDB URI
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Should print JWT secret
console.log('PORT:', process.env.PORT); // Should print server port
console.log('FRONTEND_URL:', process.env.FRONTEND_URL); // Should print frontend URL
console.log('SESSION_SECRET:', process.env.SESSION_SECRET); // Should print session secret

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Verify environment variables
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
        logger.error('Database connection error:', err);
        process.exit(1);
    }
})();

const app = express();

// Use CORS middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*'
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

// Define API routes with protection
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', protect, require('./routes/orders'));
app.use('/api/products', protect, require('./routes/productRoutes'));
app.use('/api/users', protect, require('./routes/userRoutes'));
app.use('/api/cart', protect, require('./routes/cart'));
app.use('/api/dashboard', protect, require('./routes/dashboardRoutes'));
app.use('/api/reports', protect, require('./routes/reportRoutes'));
app.use('/api/delivery', protect, require('./routes/deliveryRoutes'));

// Catchall handler for React routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Centralized error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
