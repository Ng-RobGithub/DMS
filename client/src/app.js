import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import WalletStatement from './components/WalletStatement';
import Products from './components/Products';
import Reports from './components/Reports';
import Support from './components/Support';
import FAQ from './components/FAQ';
import Logout from './components/Logout';
import Menus from './components/Menus';
import DeliveryDetails from './components/DeliveryDetails';
import ProductBrands from './components/ProductBrands';
import ProductDetails from './components/ProductDetails';
import OrderSummary from './components/OrderSummary';
import ScheduleDelivery from './components/ScheduleDelivery';
import ScheduleDeliverySummary from './components/ScheduleDeliverySummary';
import PrivacyPolicy from './components/PrivacyPolicy';
import Profile from './components/Profile';
import Users from './components/Users'; // Import Users component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    photo: 'path/to/profile/photo.jpg'
  });

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Fetch user details from the backend if needed
    }
  }, []);

  const updateUserProfile = (newDetails) => {
    setUser({
      ...user,
      ...newDetails
    });
  };

  return (
    <Router>
      <div className="app">
        <Menus user={user} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wallet-statement" element={<WalletStatement />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/delivery-details" element={<DeliveryDetails />} />
            <Route path="/product-brands" element={<ProductBrands />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/schedule-delivery" element={<ScheduleDelivery />} />
            <Route path="/schedule-delivery-summary" element={<ScheduleDeliverySummary />} />
            <Route path="/profile" element={<Profile updateUserProfile={updateUserProfile} />} />
            <Route path="/users" element={<Users />} /> {/* Add Users Route */}
            <Route path="*" element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
