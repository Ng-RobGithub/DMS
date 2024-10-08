// src/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Apply the `protect` middleware to ensure only authorized users can access these routes
router.get('/', protect, dashboardController.getDashboard);
router.put('/', protect, dashboardController.updateDashboard);

module.exports = router;
