const Dashboard = require('../models/Dashboard');
const Order = require('../models/Order');

exports.getDashboardData = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ user: req.user.id })
      .populate('orders.new')
      .populate('orders.saved')
      .populate('orders.submitted');

    if (!dashboard) {
      return res.status(404).json({ msg: 'Dashboard data not found' });
    }

    res.json(dashboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
