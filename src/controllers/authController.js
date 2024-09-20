const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model is correctly set up
const bcrypt = require('bcryptjs');

// Helper function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register Controller
const register = async (req, res) => {
    const { fullName, email, phoneNumber, country, company, customerId, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            fullName,
            email,
            phoneNumber,
            country,
            company,
            customerId,
            password: hashedPassword
        });

        await user.save();

        // Return JWT
        const token = generateToken(user.id);
        res.status(201).json({ token });
    } catch (err) {
        console.error('Error in register:', err.message);
        res.status(500).send('Server error');
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect email or password.' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect email or password.' });
        }

        // Generate JWT
        const token = generateToken(user.id);
        res.json({ token });
    } catch (err) {
        console.error('Error in login:', err.message);
        res.status(500).send('Server error');
    }
};

// Request Password Reset Controller
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // Hashing reset token
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        // Send reset email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const resetUrl = `http://${req.headers.host}/reset-password/${resetToken}`;
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USERNAME,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Click the link to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`,
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('Error sending reset email:', err);
                return res.status(500).send('Error sending reset email');
            }
            res.status(200).json({ message: 'Password reset email sent' });
        });
    } catch (err) {
        console.error('Error in requestPasswordReset:', err.message);
        res.status(500).send('Server error');
    }
};

// Reset Password Controller
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update password and clear reset token
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (err) {
        console.error('Error in resetPassword:', err.message);
        res.status(500).send('Server error');
    }
};

// Update User Profile Controller
const updateUserProfile = async (req, res) => {
    const { fullName, phoneNumber, country, company, customerId } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided, else retain old values
        user.fullName = fullName || user.fullName;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.country = country || user.country;
        user.company = company || user.company;
        user.customerId = customerId || user.customerId;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('Error in updateUserProfile:', err.message);
        res.status(500).send('Server error');
    }
};

// Delete User Controller
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error in deleteUser:', err.message);
        res.status(500).send('Server error');
    }
};

// Get All Users Controller
const getUsers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const users = await User.find()
            .select('-password')
            .limit(Number(limit))
            .skip((page - 1) * limit)
            .exec();

        const count = await User.countDocuments();
        res.status(200).json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error in getUsers:', err.message);
        res.status(500).send('Server error');
    }
};

// Export all controllers
module.exports = {
    register,
    login,
    requestPasswordReset,
    resetPassword,
    updateUserProfile,
    deleteUser,
    getUsers
};
