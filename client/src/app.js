import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Home from './components/Home';
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
import DeliveryMethod from './components/DeliveryMethod';
import ProductBrands from './components/ProductBrands';
import ProductDetails from './components/ProductDetails';
import OrderSummary from './components/OrderSummary';
import ScheduleDelivery from './components/ScheduleDelivery';
import ScheduleDeliverySummary from './components/ScheduleDeliverySummary';
import PrivacyPolicy from './components/PrivacyPolicy';
import Profile from './components/Profile';
import Users from './components/Users';
import RequestPasswordReset from './components/RequestPasswordReset';

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
      // Optionally fetch user details from the backend if needed
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
            <Route path="/register" element={<Register />} />
            <Route path="/request-password-reset" element={<RequestPasswordReset />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/login" />} />
            <Route path="/wallet-statement" element={isAuthenticated ? <WalletStatement /> : <Navigate to="/login" />} />
            <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
            <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
            <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
            <Route path="/support" element={isAuthenticated ? <Support /> : <Navigate to="/login" />} />
            <Route path="/faq" element={isAuthenticated ? <FAQ /> : <Navigate to="/login" />} />
            <Route path="/logout" element={isAuthenticated ? <Logout /> : <Navigate to="/login" />} />
            <Route path="/delivery-method" element={isAuthenticated ? <DeliveryMethod /> : <Navigate to="/login" />} />
            <Route path="/delivery-details" element={isAuthenticated ? <DeliveryDetails /> : <Navigate to="/login" />} />
            <Route path="/product-brands" element={isAuthenticated ? <ProductBrands /> : <Navigate to="/login" />} />
            <Route path="/product-details" element={isAuthenticated ? <ProductDetails /> : <Navigate to="/login" />} />
            <Route path="/order-summary" element={isAuthenticated ? <OrderSummary /> : <Navigate to="/login" />} />
            <Route path="/schedule-delivery" element={isAuthenticated ? <ScheduleDelivery /> : <Navigate to="/login" />} />
            <Route path="/schedule-delivery-summary" element={isAuthenticated ? <ScheduleDeliverySummary /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile updateUserProfile={updateUserProfile} /> : <Navigate to="/login" />} />
            <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
            <Route path="*" element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
