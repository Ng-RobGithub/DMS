const express = require('express');
const crypto = require('crypto');
// const Twilio = require('twilio');
// const Otp = require('../models/OTP'); // Adjust the path as per your directory structure

const router = express.Router();

// Initialize Twilio client
// const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Route to generate and send OTP
router.post('/generate', async (req, res) => {
    const { phoneNumber } = req.body; // Assuming phone number is sent instead of email

    try {
        const otp = crypto.randomInt(100000, 999999).toString();

        // Save OTP to database
        const otpEntry = new Otp({
            phoneNumber,
            otp,
            expiry: new Date(Date.now() + 4 * 60000) // 4 minutes from now
        });

        await otpEntry.save();

        // Send OTP via SMS using Twilio
        // await client.messages.create({
        //     body: `Your OTP code is: ${otp}`,
        //     from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
        //     to: phoneNumber
        // });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error generating or sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});

// Route to verify OTP
router.post('/verify', async (req, res) => {
    const { phoneNumber, otp } = req.body; // Assuming phone number is sent instead of email

    try {
        const otpEntry = await Otp.findOne({ phoneNumber, otp });

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
