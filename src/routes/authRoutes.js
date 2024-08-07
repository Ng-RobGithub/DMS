const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');

// Middleware to check if the request is authenticated
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded.id;
        next();
    });
};

// Middleware to handle validation results
const handleValidationResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Register a new user
router.post('/register', [
    check('fullName', 'Full name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], handleValidationResults, async (req, res) => {
    await authController.register(req, res);
});

// Login
router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
], handleValidationResults, async (req, res, next) => {
    await authController.login(req, res, next);
});

// Request password reset
router.post('/request-password-reset', [
    check('email', 'Email is required').isEmail()
], handleValidationResults, async (req, res) => {
    await authController.requestPasswordReset(req, res);
});

// Reset password
router.post('/reset-password', [
    check('token', 'Token is required').exists(),
    check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 })
], handleValidationResults, async (req, res) => {
    await authController.resetPassword(req, res);
});

// Update user profile (protected route)
router.put('/profile', authenticate, [
    check('fullName', 'Full name is required').not().isEmpty()
], handleValidationResults, async (req, res) => {
    await authController.updateUserProfile(req, res);
});

// Delete user (protected route)
router.delete('/:id', authenticate, async (req, res) => {
    await authController.deleteUser(req, res);
});

// Get all users (protected route)
router.get('/', authenticate, async (req, res) => {
    await authController.getUsers(req, res);
});

module.exports = router;
