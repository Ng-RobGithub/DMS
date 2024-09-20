require('dotenv').config(); // Load environment variables
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify required environment variables
const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
    console.error('Error: Missing required environment variable JWT_SECRET');
    process.exit(1);
}

// Token-based Authentication Middleware to Protect Routes
const protect = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        // If token doesn't exist, deny access
        if (!token) {
            return res.status(401).json({ message: 'Authorization denied: No token provided' });
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Ensure the decoded token contains user data (user object or id)
        if (!decoded || !decoded.user || !decoded.user.id) {
            return res.status(401).json({ message: 'Authorization denied: Invalid token payload' });
        }

        req.user = decoded.user;

        // Check if the user exists in the database
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: 'Authorization denied: User not found' });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            console.error('Error in authentication middleware:', err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = { protect };
