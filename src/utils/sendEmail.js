// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // e.g., Gmail, Outlook
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS  // Your email password
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
