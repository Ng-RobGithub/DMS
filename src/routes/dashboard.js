const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');

// @route    GET api/dashboard
// @desc     Get dashboard data
// @access   Private
router.get('/', auth, dashboardController.getDashboardData);

module.exports = router;
