const express = require('express');
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Ensure `protect` is imported correctly

const router = express.Router();

// Validation middleware for user registration
const registerValidation = [
  check('fullName', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

// Validation middleware for updating user profile
const updateProfileValidation = [
  check('fullName', 'Name is required').not().isEmpty(),
  check('photo', 'Photo URL should be a valid URL').optional().isURL()
];

// Route to register a new user
router.post('/register', registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  userController.registerUser(req, res);
});

// Route to update user profile
router.put('/updateProfile', protect, updateProfileValidation, (req, res) => { // Use `protect` middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  userController.updateUserProfile(req, res);
});

// Route to delete a user
router.delete('/:id', protect, (req, res) => { // Use `protect` middleware
  userController.deleteUser(req, res);
});

// Route to get all users
router.get('/', protect, (req, res) => { // Use `protect` middleware
  userController.getUsers(req, res);
});

module.exports = router;
