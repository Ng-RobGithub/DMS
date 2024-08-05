const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User'); // Adjust the path to your User model
const sendEmail = require('../utils/sendEmail'); // Import the sendEmail utility

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new user
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, phoneNumber, country, company, customerId, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const normalizedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber.replace(/^\d+/, '')}`;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            fullName,
            email,
            phoneNumber: normalizedPhoneNumber,
            country,
            company,
            customerId,
            password: hashedPassword
        });

        await user.save();

        const token = generateToken(user.id);
        res.status(201).json({ message: 'User registered successfully.', token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login a user
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.id);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Request password reset
exports.requestPasswordReset = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User with this email does not exist.' });
        }

        const resetToken = generateToken(user.id);
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        await sendEmail({
            to: user.email,
            subject: 'Password Reset Request',
            text: `You have requested a password reset. Please click the following link to reset your password: ${resetUrl}`
        });

        res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
        console.error('Password reset request error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, photo } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.fullName = fullName || user.fullName;
        user.photo = photo || user.photo;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('User deletion error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error('Fetch users error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
