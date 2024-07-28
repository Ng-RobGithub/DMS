const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  userController.registerUser
);

// @route    POST api/users/updateProfile
// @desc     Update user profile
// @access   Private
router.post(
  '/updateProfile',
  [
    authMiddleware,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('photo', 'Photo URL is required').not().isEmpty()
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    userController.updateUserProfile(req, res);
  }
);

module.exports = router;
