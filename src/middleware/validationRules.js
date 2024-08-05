const { body } = require('express-validator');

// Validation rules for login
const loginValidationRules = [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

module.exports = loginValidationRules;
