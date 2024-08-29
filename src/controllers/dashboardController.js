// src/controllers/dashboardController.js
const getDashboard = async (req, res) => {
    try {
        // Fetch or define your dashboard data here
        const dashboardData = {
            user: req.user ? req.user.name : 'Guest User', // Example usage of req.user from the `protect` middleware
            ledgerBalance: 1000,
            availableBalance: 500
        };
        res.json(dashboardData);
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        res.status(500).json({ error: 'Failed to load dashboard data' });
    }
};

const updateDashboard = async (req, res) => {
    try {
        // Handle dashboard update logic here
        res.status(200).json({ message: 'Dashboard updated successfully' });
    } catch (err) {
        console.error('Error updating dashboard data:', err);
        res.status(500).json({ error: 'Failed to update dashboard data' });
    }
};

module.exports = {
    getDashboard,
    updateDashboard
};
