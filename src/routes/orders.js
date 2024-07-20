const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// @route    POST api/orders
// @desc     Create a new order
// @access   Private
router.post('/', authMiddleware, orderController.createOrder);

// @route    PUT api/orders/:id
// @desc     Update the status of an order
// @access   Private
router.put('/:id', authMiddleware, orderController.updateOrderStatus);

// @route    GET api/orders
// @desc     Get all orders for the logged-in user
// @access   Private
router.get('/', authMiddleware, orderController.getOrders);

// @route    GET api/orders/:id
// @desc     Get a specific order by ID
// @access   Private
router.get('/:id', authMiddleware, orderController.getOrderById);

// @route    DELETE api/orders/:id
// @desc     Delete an order
// @access   Private
router.delete('/:id', authMiddleware, orderController.deleteOrder);

module.exports = router;
