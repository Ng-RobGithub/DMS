const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

// @route    GET api/cart
// @desc     Get all items in the cart
// @access   Private
router.get('/', protect, cartController.getCartItems);

// @route    POST api/cart
// @desc     Add an item to the cart
// @access   Private
router.post('/', protect, cartController.addItemToCart);

// @route    PUT api/cart/:id
// @desc     Update item quantity in the cart
// @access   Private
router.put('/:id', protect, cartController.updateCartItem);

// @route    DELETE api/cart/:id
// @desc     Remove an item from the cart
// @access   Private
router.delete('/:id', protect, cartController.removeItemFromCart);

module.exports = router;
