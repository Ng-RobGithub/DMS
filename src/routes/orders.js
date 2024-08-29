const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Importing specific middleware function
const orderController = require('../controllers/orderController');

// @route    POST api/orders
// @desc     Create a new order
// @access   Private
router.post('/', protect, orderController.createOrder);

// @route    PUT api/orders/:id
// @desc     Update the status of an order
// @access   Private
router.put('/:id', protect, orderController.updateOrderStatus);

// @route    GET api/orders
// @desc     Get all orders for the logged-in user
// @access   Private
router.get('/', protect, orderController.getOrders);

// @route    GET api/orders/:id
// @desc     Get a specific order by ID
// @access   Private
router.get('/:id', protect, orderController.getOrderById);

// @route    DELETE api/orders/:id
// @desc     Delete an order
// @access   Private
router.delete('/:id', protect, orderController.deleteOrder);

// @route    GET api/orders/performance
// @desc     Get distributor performance by quarters
// @access   Private
router.get('/performance', protect, orderController.getQuarterlyPerformance);

module.exports = router;
