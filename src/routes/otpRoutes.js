const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Otp = require('../models/OTP'); // Adjust the path as per your directory structure

const router = express.Router();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to generate and send OTP
router.post('/generate', async (req, res) => {
    const { email } = req.body;

    try {
        const otp = crypto.randomInt(100000, 999999).toString();

        // Save OTP to database
        const otpEntry = new Otp({
            email,
            otp,
            expiry: new Date(Date.now() + 4 * 60000) // 4 minutes from now
        });

        await otpEntry.save();

        // Send OTP via email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error generating or sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});

// Route to verify OTP
router.post('/verify', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const otpEntry = await Otp.findOne({ email, otp });

        if (!otpEntry) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (otpEntry.expiry < new Date()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Failed to verify OTP' });
    }
});

module.exports = router;
