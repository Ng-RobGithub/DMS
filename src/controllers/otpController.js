const Otp = require('../models/OTP'); // Adjust the path as per your directory structure
const { generateOTP, sendOtpSms, verifyOTP } = require('../utils/otpUtils');

// Generate and send OTP
const generateOtp = async (req, res) => {
    const { phoneNumber } = req.body; // Use phoneNumber instead of email

    try {
        const otp = generateOTP();

        // Save OTP to database
        const otpEntry = new Otp({
            phoneNumber,
            otp,
            expiry: new Date(Date.now() + 4 * 60000) // 4 minutes from now
        });

        await otpEntry.save();

        // Send OTP via SMS
        await sendOtpSms(phoneNumber, otp);

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error generating or sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};

// Verify OTP
const verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body; // Use phoneNumber instead of email

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
};

module.exports = {
    generateOtp,
    verifyOtp
};
