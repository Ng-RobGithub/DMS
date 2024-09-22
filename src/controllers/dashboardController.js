const Dashboard = require('../models/Dashboard');
const Order = require('../models/Order');

// Get the dashboard data for the logged-in user
const getDashboard = async (req, res) => {
    try {
        // Fetch the dashboard for the logged-in user
        let dashboard = await Dashboard.findOne({ user: req.user.id });

        if (!dashboard) {
            // If no dashboard exists, create a new one
            dashboard = new Dashboard({ user: req.user.id });
            await dashboard.save();
        }

        // Fetch orders for the logged-in user
        const orders = await Order.find({ user: req.user.id });

        // Calculate the total wallet balance and available balance
        const totalWalletBalance = dashboard.totalWalletBalance; // Ensure this is stored in the dashboard
        const availableBalance = dashboard.availableBalance; // Use the field names you need

        // Send the dashboard data as response
        res.json({
            totalWalletBalance, // Total money in the user's wallet including bonuses
            availableBalance,   // Amount available for placing an order
            ordersCount: orders.length // Number of orders the user has placed
        });
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        res.status(500).json({ error: 'Failed to load dashboard data' });
    }
};

// Update the dashboard data for the logged-in user
const updateDashboard = async (req, res) => {
    try {
        const { totalWalletBalance, availableBalance } = req.body;

        // Validate input
        if (typeof totalWalletBalance !== 'number' || totalWalletBalance < 0) {
            return res.status(400).json({ error: 'Invalid total wallet balance' });
        }
        if (typeof availableBalance !== 'number' || availableBalance < 0) {
            return res.status(400).json({ error: 'Invalid available balance' });
        }

        // Find the dashboard for the logged-in user
        let dashboard = await Dashboard.findOne({ user: req.user.id });

        if (!dashboard) {
            return res.status(404).json({ error: 'Dashboard not found' });
        }

        // Update the dashboard with new balances
        dashboard.totalWalletBalance = totalWalletBalance;
        dashboard.availableBalance = availableBalance;

        await dashboard.save();

        res.json({ message: 'Dashboard updated successfully', dashboard });
    } catch (err) {
        console.error('Error updating dashboard data:', err);
        res.status(500).json({ error: 'Failed to update dashboard data' });
    }
};

module.exports = {
    getDashboard,
    updateDashboard
};
