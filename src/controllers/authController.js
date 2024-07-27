const User = require('../models/User');
const { generateOTP, sendOtpEmail } = require('../utils/otpUtils');

// Function to handle user registration
exports.register = async (req, res) => {
    const { fullName, email, phoneNumber, country, company, customerId, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            fullName,
            email,
            phoneNumber,
            country,
            company,
            customerId,
            password
        });

        await user.save();

        const otp = generateOTP();
        await sendOtpEmail(email, otp);

        res.status(200).json({ message: 'User registered successfully. OTP sent to email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to handle user login
exports.login = async (req, res) => {
    // Implement login functionality
};
