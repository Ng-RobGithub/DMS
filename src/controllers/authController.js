const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming User model is correctly set up
const statusCode = require('./statusCodes/statusCode');
const argon2 = require('argon2');

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register Controller
const register = async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    country,
    company,
    customerId,
    password,
  } = req.body;

  try {
    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check if the user already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });
    if (existingUser) {
      return res
        .status(statusCode.FORBIDDEN)
        .json({ message: 'User already exists' });
    }

    // Hash password before saving using Argon2
    const hashedPassword = await argon2.hash(password); // Hashing with Argon2
    console.log(hashedPassword);

    // Create a new user
    const user = new User({
      fullName,
      email: normalizedEmail, // Normalize email before saving
      phoneNumber,
      country,
      company,
      customerId,
      password: hashedPassword,
    });

    await user.save();

    res.status(statusCode.CREATED).json({
      user: {
        // Return user information
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country,
        company: user.company,
        customerId: user.customerId,
      },
      message: 'User registered successfully',
    });
  } catch (err) {
    console.error('Error in register:', err.message);
    res.status(statusCode.SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Login Controller
const login = async (req, res) => {
  console.log(req.body); // For debugging
  const { email, password } = req.body;

  try {
    // Normalize email
    const normalizedEmail = email.trim().toLowerCase(); // Normalize email

    // Check if user exists
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(statusCode.FORBIDDEN).json({
        message: 'User does not exist.',
      });
    }

    console.log(user?.password);

    // Compare password using Argon2
    const isMatch = await argon2.verify(user.password, password); // Comparing with Argon2
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Incorrect email or password.',
      });
    }

    // Generate JWT and send response with user information
    const token = generateToken(user.id);
    res.json({
      token,
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Error in login:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Request Password Reset Controller
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration

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
        return res.status(500).json({
          message: 'Error sending reset email',
        });
      }
      res.status(200).json({
        message: 'Password reset email sent',
      });
    });
  } catch (err) {
    console.error('Error in requestPasswordReset:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset Password Controller
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Token should not be expired
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired token',
      });
    }

    // Update password and clear reset token
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({
      message: 'Password has been reset successfully',
    });
  } catch (err) {
    console.error('Error in resetPassword:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Profile Controller
const updateUserProfile = async (req, res) => {
  const { fullName, phoneNumber, country, company, customerId } = req.body;

  try {
    const user = await User.findById(req.user.id); // Assuming `req.user.id` is available from middleware (e.g., auth)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields only if provided
    user.fullName = fullName || user.fullName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.country = country || user.country;
    user.company = company || user.company;
    user.customerId = customerId || user.customerId;

    await user.save();
    res.status(200).json({
      message: 'Profile updated successfully',
    });
  } catch (err) {
    console.error('Error in updateUserProfile:', err.message);
    res.status(500).json({ message: 'Server error' });
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
    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    console.error('Error in deleteUser:', err.message);
    res.status(statusCode.SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Get All Users Controller
const getUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const users = await User.find()
      .select('-password') // Exclude password field
      .limit(Number(limit))
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments();
    res.status(200).json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    console.error('Error in getUsers:', err.message);
    res.status(500).json({ message: 'Server error' });
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
  getUsers,
};
