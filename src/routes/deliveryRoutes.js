const express = require('express');
const router = express.Router();

// Example data, replace with actual data from your database or configuration
const countries = ['Nigeria'];
const states = {
  'Nigeria': ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Delta', 'Rivers', 'Cross River', 'Lagos', 'Imo'],
  // Add other countries and their states here
};

router.get('/countries', (req, res) => {
  res.json(countries);
});

router.get('/states/:country', (req, res) => {
  const country = req.params.country;
  res.json(states[country] || []);
});

module.exports = router;
