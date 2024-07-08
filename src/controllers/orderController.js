const Order = require('../models/Order');
const Dashboard = require('../models/Dashboard');

// Create a new order
exports.createOrder = async (req, res) => {
  const { products, status, totalAmount } = req.body;

  try {
    // Create the order
    const newOrder = new Order({
      user: req.user.id,
      products,
      status,
      totalAmount
    });

    const order = await newOrder.save();

    // Find the dashboard for the user
    let dashboard = await Dashboard.findOne({ user: req.user.id });

    // If no dashboard exists, create one
    if (!dashboard) {
      dashboard = new Dashboard({
        user: req.user.id,
        orders: {
          new: status === 'new' ? [order._id] : [],
          saved: status === 'saved' ? [order._id] : [],
          submitted: status === 'submitted' ? [order._id] : []
        }
      });
    } else {
      // Add the order to the appropriate category
      if (status === 'new') {
        dashboard.orders.new.push(order._id);
      } else if (status === 'saved') {
        dashboard.orders.saved.push(order._id);
      } else if (status === 'submitted') {
        dashboard.orders.submitted.push(order._id);
      }
    }

    await dashboard.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update the status of an order
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    // Find the order by ID
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check if the user is authorized
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get the previous status of the order
    const previousStatus = order.status;

    // Update the status of the order
    order.status = status;
    await order.save();

    // Find the dashboard for the user
    const dashboard = await Dashboard.findOne({ user: req.user.id });

    // Remove the order from the previous status category
    if (previousStatus === 'new') {
      dashboard.orders.new.pull(order._id);
    } else if (previousStatus === 'saved') {
      dashboard.orders.saved.pull(order._id);
    } else if (previousStatus === 'submitted') {
      dashboard.orders.submitted.pull(order._id);
    }

    // Add the order to the new status category
    if (status === 'new') {
      dashboard.orders.new.push(order._id);
    } else if (status === 'saved') {
      dashboard.orders.saved.push(order._id);
    } else if (status === 'submitted') {
      dashboard.orders.submitted.push(order._id);
    }

    await dashboard.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all orders for the logged-in user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check if the user is authorized
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check if the user is authorized
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await order.remove();

    // Find the dashboard for the user
    const dashboard = await Dashboard.findOne({ user: req.user.id });

    // Remove the order from the appropriate category
    if (order.status === 'new') {
      dashboard.orders.new.pull(order._id);
    } else if (order.status === 'saved') {
      dashboard.orders.saved.pull(order._id);
    } else if (order.status === 'submitted') {
      dashboard.orders.submitted.pull(order._id);
    }

    await dashboard.save();

    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
