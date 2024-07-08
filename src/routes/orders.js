const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

// @route    POST api/orders
// @desc     Create a new order
// @access   Private
router.post('/', auth, orderController.createOrder);

// @route    PUT api/orders/:id
// @desc     Update the status of an order
// @access   Private
router.put('/:id', auth, orderController.updateOrderStatus);

// @route    GET api/orders
// @desc     Get all orders for the logged-in user
// @access   Private
router.get('/', auth, orderController.getOrders);

// @route    GET api/orders/:id
// @desc     Get a specific order by ID
// @access   Private
router.get('/:id', auth, orderController.getOrderById);

// @route    DELETE api/orders/:id
// @desc     Delete an order
// @access   Private
router.delete('/:id', auth, orderController.deleteOrder);

module.exports = router;
