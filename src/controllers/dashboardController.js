const Dashboard = require('../models/Dashboard');

// Fetch dashboard data
exports.getDashboard = async (req, res) => {
    try {
        const dashboard = await Dashboard.findOne({ user: req.user.id })
            .populate('orders.new')
            .populate('orders.saved')
            .populate('orders.submitted');
        if (!dashboard) return res.status(404).json({ message: 'Dashboard not found' });
        res.json(dashboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update dashboard data
exports.updateDashboard = async (req, res) => {
    const { ledgerBalance, availableBalance, orders } = req.body;
    try {
        const dashboard = await Dashboard.findOneAndUpdate(
            { user: req.user.id },
            { ledgerBalance, availableBalance, orders },
            { new: true }
        );
        res.json(dashboard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
