// utils/sendEmail.js
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send email
const sendEmail = async (options) => {
    const mailOptions = {
        from: 'your-email@example.com',
        to: options.to,
        subject: options.subject,
        text: options.text
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;
