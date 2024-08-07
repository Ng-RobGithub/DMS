require('dotenv').config(); // Ensure environment variables are loaded

const jwt = require('jsonwebtoken');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const User = require('../models/User');

// Check if MONGO_URI is available
if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Initialize session middleware
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // Use mongoUrl for connect-mongo
        collectionName: 'sessions',
        ttl: 24 * 60 * 60 // Optional: Session TTL in seconds
    })
});

const protect = async (req, res, next) => {
    try {
        // Check for session user
        if (req.session && req.session.userId) {
            const user = await User.findById(req.session.userId);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized: User not found' });
            }
            req.user = user;
            return next();
        }

        // Get token from header or cookies
        const token = req.header('x-auth-token') || req.cookies.token;

        // Check if no token
        if (!token) {
            return res.status(401).json({ message: 'Authorization denied: No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired, please log in again' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token is not valid' });
        } else {
            console.error('Server error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = { sessionMiddleware, protect };
