// src/utils/otpUtils.js
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Generate a new OTP
const generateOTP = () => {
    // Generate a random OTP
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    return otp;
};

// Send OTP via email
const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};

// Verify the OTP
const verifyOTP = (providedOtp, actualOtp) => {
    // Compare the provided OTP with the actual OTP
    return providedOtp === actualOtp;
};

module.exports = {
    generateOTP,
    sendOtpEmail,
    verifyOTP
};
