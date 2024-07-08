const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');

// @route    POST api/cart
// @desc     Add product to cart
// @access   Private
router.post('/', auth, cartController.addToCart);

// @route    GET api/cart
// @desc     View cart
// @access   Private
router.get('/', auth, cartController.viewCart);

// @route    POST api/cart/schedule
// @desc     Schedule delivery
// @access   Private
router.post('/schedule', auth, cartController.scheduleDelivery);

// @route    PUT api/cart/status
// @desc     Update order status (checkout, save, cancel)
// @access   Private
router.put('/status', auth, cartController.updateOrderStatus);

module.exports = router;
