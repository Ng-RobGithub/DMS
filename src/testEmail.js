// Load environment variables from .env file
require('dotenv').config();

const nodemailer = require('nodemailer');

// Print environment variables to verify they are loaded correctly
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);

const sendTestEmail = async () => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT, 10),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        },
        // Increase the timeout setting
        connectionTimeout: 60000, // 60 seconds
        greetingTimeout: 60000, // 60 seconds
        socketTimeout: 60000 // 60 seconds
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: 'recipient@example.com', // Replace with a valid recipient email address
        subject: 'Test Email',
        text: 'This is a test email.'
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending test email:', error);
    }
};

sendTestEmail();
