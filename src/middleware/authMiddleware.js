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
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        // Log the extracted token
        console.log('Extracted Token:', token);

        // If token doesn't exist, deny access
        if (!token) {
            console.log('Authorization denied: No token provided');
            return res.status(401).json({ message: 'Authorization denied: No token provided' });
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Token:', decoded); // Log the decoded token

        // Check if the decoded token contains the user ID
        if (!decoded || !decoded.id) {
            console.log('Authorization denied: Invalid token payload');
            return res.status(401).json({ message: 'Authorization denied: Invalid token payload' });
        }

        // Set user ID from the token to the request object
        req.user = { id: decoded.id };

        // Check if the user exists in the database
        const user = await User.findById(req.user.id);
        if (!user) {
            console.log('Authorization denied: User not found');
            return res.status(401).json({ message: 'Authorization denied: User not found' });
        }

        // Log the user found
        console.log('User found:', user);

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error('Error in authentication middleware:', err);

        // Handle different JWT errors
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            // General server error
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = { protect };
