/* const crypto = require('crypto');
const twilio = require('twilio');
require('dotenv').config();

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

// Generate OTP (for internal use, if needed)
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Send OTP via SMS using Twilio Verify API
const sendVerification = async (phoneNumber) => {
    try {
        const verification = await client.verify.services(verifyServiceSid)
            .verifications
            .create({ to: phoneNumber, channel: 'sms' });
        console.log('Verification SID:', verification.sid);
        return verification;
    } catch (error) {
        console.error('Error sending verification code:', error.message);
        throw new Error('Failed to send OTP. Please try again later.');
    }
};

// Check OTP via Twilio Verify API
const checkVerification = async (phoneNumber, code) => {
    try {
        const verificationCheck = await client.verify.services(verifyServiceSid)
            .verificationChecks
            .create({ to: phoneNumber, code });
        console.log('Verification Status:', verificationCheck.status);
        return verificationCheck.status;
    } catch (error) {
        console.error('Error checking verification code:', error.message);
        throw new Error('Failed to verify OTP. Please check the code and try again.');
    }
};

// Send a test SMS directly (for debugging purposes)
const sendTestSms = async (fromNumber, toNumber, message) => {
    try {
        const messageResponse = await client.messages.create({
            body: message,
            from: fromNumber,
            to: toNumber
        });
        console.log('Message SID:', messageResponse.sid);
        return messageResponse;
    } catch (error) {
        console.error('Error sending SMS:', error.message);
        throw new Error('Failed to send SMS. Please try again later.');
    }
};

// Example usage of sendTestSms function
const fromNumber = '+2349050115674'; // Your Twilio number or verified number
const toNumber = '+2348032775584';   // Recipient's phone number
const testMessage = 'Hello, this is a test message from Twilio!';

// Uncomment to test sending a direct SMS
// sendTestSms(fromNumber, toNumber, testMessage);

module.exports = {
    generateOTP,
    sendVerification,
    checkVerification,
    sendTestSms // Export the test SMS function
};
*/