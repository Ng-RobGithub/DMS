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
    check('fullName').trim().not().isEmpty().withMessage('Full name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('phoneNumber').trim().not().isEmpty().withMessage('Phone number is required'),
    check('country').trim().not().isEmpty().withMessage('Country is required'),
    check('company').trim().not().isEmpty().withMessage('Company is required'),
    check('customerId').trim().not().isEmpty().withMessage('Customer ID is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], handleValidationResults, authController.register);

// Login
router.post('/login', [
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').exists().withMessage('Password is required')
], handleValidationResults, authController.login);

// Request password reset
router.post('/request-password-reset', [
    check('email').isEmail().withMessage('Valid email is required')
], handleValidationResults, authController.requestPasswordReset);

// Reset password
router.post('/reset-password', [
    check('token').exists().withMessage('Token is required'),
    check('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], handleValidationResults, authController.resetPassword);

// Update user profile (protected route)
router.put('/profile', authenticate, [
    check('fullName').trim().not().isEmpty().withMessage('Full name is required')
], handleValidationResults, authController.updateUserProfile);

// Delete user (protected route)
router.delete('/:id', authenticate, authController.deleteUser);

// Get all users (protected route)
router.get('/', authenticate, authController.getUsers);

module.exports = router;
