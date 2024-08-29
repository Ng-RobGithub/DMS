require('dotenv').config(); // Ensure environment variables are loaded

const jwt = require('jsonwebtoken');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('../models/User');

// Verify JWT secret
if (!process.env.JWT_SECRET) {
    console.error('Error: JWT_SECRET is not defined in .env file');
    process.exit(1);
}

// Session Middleware setup
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,  // Your MongoDB connection string
        collectionName: 'sessions',
        ttl: 24 * 60 * 60  // 1 day in seconds
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
    }
});

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        // Extract token from headers or cookies
        const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token;

        if (!token) {
            console.warn('Authorization denied: No token provided');
            return res.status(401).json({ message: 'Authorization denied: No token provided' });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        // Optional: Check if the user exists in the database
        // const user = await User.findById(req.user.id);
        // if (!user) {
        //     return res.status(401).json({ message: 'User not found' });
        // }

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.warn('Token has expired');
            return res.status(401).json({ message: 'Token has expired, please log in again' });
        } else if (err.name === 'JsonWebTokenError') {
            console.warn('Token is not valid');
            return res.status(401).json({ message: 'Token is not valid' });
        } else {
            console.error('Server error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = { sessionMiddleware, protect };
