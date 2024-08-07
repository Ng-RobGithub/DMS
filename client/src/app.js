import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Menus from './components/Menus';
import PrivateRoute from './components/PrivateRoute';

// Lazy load components to improve performance
const Register = lazy(() => import('./components/Register'));
const Home = lazy(() => import('./components/Home'));
const Cart = lazy(() => import('./components/Cart'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Orders = lazy(() => import('./components/Orders'));
const WalletStatement = lazy(() => import('./components/WalletStatement'));
const Products = lazy(() => import('./components/Products'));
const Reports = lazy(() => import('./components/Reports'));
const Support = lazy(() => import('./components/Support'));
const FAQ = lazy(() => import('./components/FAQ'));
const Logout = lazy(() => import('./components/Logout'));
const DeliveryDetails = lazy(() => import('./components/DeliveryDetails'));
const DeliveryMethod = lazy(() => import('./components/DeliveryMethod'));
const ProductBrands = lazy(() => import('./components/ProductBrands'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const OrderSummary = lazy(() => import('./components/OrderSummary'));
const ScheduleDelivery = lazy(() => import('./components/ScheduleDelivery'));
const ScheduleDeliverySummary = lazy(() => import('./components/ScheduleDeliverySummary'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const Profile = lazy(() => import('./components/Profile'));
const Users = lazy(() => import('./components/Users'));
const RequestPasswordReset = lazy(() => import('./components/RequestPasswordReset'));
const Login = lazy(() => import('./components/Login'));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: '',
    photo: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally verify token validity
      setIsAuthenticated(true);
      // Fetch user details from the backend if needed
      // Example:
      // fetchUserDetails(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const updateUserProfile = (newDetails) => {
    setUser(prevUser => ({
      ...prevUser,
      ...newDetails
    }));
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Menus user={user} />}
        <div className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
              <Route path="/home" element={<PrivateRoute isAuthenticated={isAuthenticated}><Home /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/request-password-reset" element={<RequestPasswordReset />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              
              <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute isAuthenticated={isAuthenticated}><Orders /></PrivateRoute>} />
              <Route path="/wallet-statement" element={<PrivateRoute isAuthenticated={isAuthenticated}><WalletStatement /></PrivateRoute>} />
              <Route path="/products" element={<PrivateRoute isAuthenticated={isAuthenticated}><Products /></PrivateRoute>} />
              <Route path="/cart" element={<PrivateRoute isAuthenticated={isAuthenticated}><Cart /></PrivateRoute>} />
              <Route path="/reports" element={<PrivateRoute isAuthenticated={isAuthenticated}><Reports /></PrivateRoute>} />
              <Route path="/support" element={<PrivateRoute isAuthenticated={isAuthenticated}><Support /></PrivateRoute>} />
              <Route path="/faq" element={<PrivateRoute isAuthenticated={isAuthenticated}><FAQ /></PrivateRoute>} />
              <Route path="/logout" element={<PrivateRoute isAuthenticated={isAuthenticated}><Logout /></PrivateRoute>} />
              <Route path="/delivery-method" element={<PrivateRoute isAuthenticated={isAuthenticated}><DeliveryMethod /></PrivateRoute>} />
              <Route path="/delivery-details" element={<PrivateRoute isAuthenticated={isAuthenticated}><DeliveryDetails /></PrivateRoute>} />
              <Route path="/product-brands" element={<PrivateRoute isAuthenticated={isAuthenticated}><ProductBrands /></PrivateRoute>} />
              <Route path="/product-details" element={<PrivateRoute isAuthenticated={isAuthenticated}><ProductDetails /></PrivateRoute>} />
              <Route path="/order-summary" element={<PrivateRoute isAuthenticated={isAuthenticated}><OrderSummary /></PrivateRoute>} />
              <Route path="/schedule-delivery" element={<PrivateRoute isAuthenticated={isAuthenticated}><ScheduleDelivery /></PrivateRoute>} />
              <Route path="/schedule-delivery-summary" element={<PrivateRoute isAuthenticated={isAuthenticated}><ScheduleDeliverySummary /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute isAuthenticated={isAuthenticated}><Profile updateUserProfile={updateUserProfile} /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute isAuthenticated={isAuthenticated}><Users /></PrivateRoute>} />
              
              <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default App;
