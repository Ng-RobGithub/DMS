const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', [
    check('fullName', 'Full name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], authController.register);

// Login
router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
], (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ message: info ? info.message : 'Login failed', user });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const payload = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token });
        });
    })(req, res, next);
});

// Request password reset
router.post('/request-password-reset', [
    check('email', 'Email is required').isEmail()
], authController.requestPasswordReset);

// Reset password
router.post('/reset-password', [
    check('token', 'Token is required').exists(),
    check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 })
], authController.resetPassword);

// Update user profile
router.put('/profile', authController.updateUserProfile);

// Delete user
router.delete('/:id', authController.deleteUser);

// Get all users
router.get('/', authController.getUsers);

module.exports = router;
