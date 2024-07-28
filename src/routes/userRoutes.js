const express = require('express');
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('fullName', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    userController.registerUser(req, res);
  }
);

// @route    PUT api/users/updateProfile
// @desc     Update user profile
// @access   Private
router.put(
  '/updateProfile',
  [
    authMiddleware,
    [
      check('fullName', 'Name is required').not().isEmpty(),
      check('photo', 'Photo URL is required').optional().isURL()
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

// @route    DELETE api/users/:id
// @desc     Delete user
// @access   Private
router.delete('/:id', authMiddleware, userController.deleteUser);

// @route    GET api/users
// @desc     Get all users
// @access   Private
router.get('/', authMiddleware, userController.getUsers);

module.exports = router;
