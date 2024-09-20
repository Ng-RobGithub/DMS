const Order = require('../models/Order.js');
const Dashboard = require('../models/Dashboard.js');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const moment = require('moment'); // For date manipulation

// Helper function to update dashboard
const updateDashboard = async (userId, orderId, oldStatus, newStatus) => {
  let dashboard = await Dashboard.findOne({ user: userId });

  if (!dashboard) {
    dashboard = new Dashboard({
      user: userId,
      orders: {
        new: [],
        saved: [],
        submitted: []
      }
    });
  }

  // Remove order from the old status category
  if (oldStatus === 'new') dashboard.orders.new.pull(orderId);
  else if (oldStatus === 'saved') dashboard.orders.saved.pull(orderId);
  else if (oldStatus === 'submitted') dashboard.orders.submitted.pull(orderId);

  // Add the order to the new status category
  if (newStatus === 'new') dashboard.orders.new.push(orderId);
  else if (newStatus === 'saved') dashboard.orders.saved.push(orderId);
  else if (newStatus === 'submitted') dashboard.orders.submitted.push(orderId);

  await dashboard.save();
};

// Create a new order
const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { products, status, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id,
      products,
      status,
      totalAmount
    });

    const order = await newOrder.save();

    // Update the dashboard
    await updateDashboard(req.user.id, order._id, 'new', status);

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update the status of an order
const updateOrderStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { status } = req.body;

  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const previousStatus = order.status;

    order.status = status;
    await order.save();

    // Update the dashboard
    await updateDashboard(req.user.id, order._id, previousStatus, status);

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all orders for the logged-in user
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

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
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await order.remove();

    // Update the dashboard
    await updateDashboard(req.user.id, order._id, order.status, '');

    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get distributor performance by quarters
const getQuarterlyPerformance = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).select('date');

    const performanceData = {
      'Jan-Feb-Mar': 0,
      'Apr-May-Jun': 0,
      'Jul-Aug-Sep': 0,
      'Oct-Nov-Dec': 0
    };

    orders.forEach(order => {
      const month = moment(order.date).month();
      let quarter;

      if (month >= 0 && month <= 2) quarter = 'Jan-Feb-Mar';
      else if (month >= 3 && month <= 5) quarter = 'Apr-May-Jun';
      else if (month >= 6 && month <= 8) quarter = 'Jul-Aug-Sep';
      else if (month >= 9 && month <= 11) quarter = 'Oct-Nov-Dec';

      if (quarter) performanceData[quarter] += 1;
    });

    res.json(performanceData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Refresh authentication token
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ msg: 'No refresh token provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });

    await user.save();

    // Generate JWT token for the user
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get total number of orders for the logged-in user
const getOrderCount = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments({ user: req.user.id });
    res.json({ count: orderCount });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Exporting all the functions
module.exports = {
  createOrder,
  updateOrderStatus,
  getOrders,
  getOrderById,
  deleteOrder,
  getQuarterlyPerformance,
  refreshToken,
  createUser,  // New user creation function
  getOrderCount // New order count function
};
