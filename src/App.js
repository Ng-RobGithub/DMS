const express = require('express');
const connectDB = require('../../src/config/db');
const authRoutes = require('../../src/routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportsRoutes = require('../../src/routes/reportsRoutes');
const productRoutes = require('../../src/routes/productRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
