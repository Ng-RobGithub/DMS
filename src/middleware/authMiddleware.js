const jwt = require('jsonwebtoken');
const config = require('config');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const User = require('../models/User');

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
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
        mongooseConnection: mongoose.connection // Ensure correct connection reference
    })
});

const protect = async (req, res, next) => {
    // Check for session user
    if (req.session && req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = user;
            return next();
        } catch (err) {
            console.error('Session error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    // Get token from header or cookies
    const token = req.header('x-auth-token') || req.cookies.token;

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('JWT_SECRET'));
        req.user = decoded.user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token has expired, please log in again' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Token is not valid' });
        } else {
            return res.status(500).json({ msg: 'Server error' });
        }
    }
};

module.exports = { sessionMiddleware, protect };
