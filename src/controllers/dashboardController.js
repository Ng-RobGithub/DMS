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
        const totalWalletBalance = dashboard.calculateTotalBalance(); // Use the custom method if needed
        const availableBalance = dashboard.availableBalance; // Use updated field names

        // Send the dashboard data as response
        res.json({
            totalWalletBalance, // Updated field name
            availableBalance,   // Updated field name
            ordersCount: orders.length // Example additional data
        });
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        res.status(500).json({ error: 'Failed to load dashboard data' });
    }
};

// Update the dashboard data for the logged-in user
const updateDashboard = async (req, res) => {
    try {
        const { totalWalletBalance, availableBalance } = req.body; // Updated field names

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

        // Update the dashboard
        dashboard.ledgerBalance = totalWalletBalance - availableBalance; // Adjust logic if needed
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
