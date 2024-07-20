// src/routes/cart.js
const express = require('express');
const { getCart, addToCart, clearCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.delete('/', authMiddleware, clearCart);

module.exports = router;
