const express = require('express');
const router = express.Router();
const OrderTrackingController = require('../controllers/OrderTrackingController');

// Fetch order status
router.get('/order/:id/status', async (req, res) => {
  const orderId = req.params.id;
  // Find order by ID in the database
  const order = await Order.findOne({ orderId });
  if (order) {
    res.json({ orderStatus: order.orderStatus });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Fetch order tracking details
router.get('/order/:id/tracking', async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findOne({ orderId });
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Update order status
router.post('/order/:id/update-status', async (req, res) => {
  const orderId = req.params.id;
  const { newStatus } = req.body;
  const order = await Order.findOneAndUpdate(
    { orderId },
    { orderStatus: newStatus },
    { new: true },
  );
  if (order) {
    res.json({ message: 'Order status updated', order });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

module.exports = router;
