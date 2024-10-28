const OrderTracking = require('../models/OrderTracking');

exports.updateOrderStatus = async (req, res) => {
  const { orderId, newStatus } = req.body;

  try {
    // Find the order by ID and update its status
    let orderTracking = await OrderTracking.findOne({ orderId });
    if (!orderTracking) {
      // If order tracking does not exist, create a new entry
      orderTracking = new OrderTracking({
        orderId,
        currentStatus: newStatus,
        statusHistory: [],
      });
    }

    // Update the current status and push to the history array
    orderTracking.currentStatus = newStatus;
    orderTracking.statusHistory.push({ status: newStatus });

    await orderTracking.save();
    res
      .status(200)
      .json({ message: 'Order status updated successfully', orderTracking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

exports.getOrderTracking = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderTracking = await OrderTracking.findOne({ orderId });
    if (!orderTracking) {
      return res
        .status(404)
        .json({ message: 'Order tracking information not found' });
    }

    res.status(200).json(orderTracking);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving order tracking information', error });
  }
};
