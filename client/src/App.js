import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Menus from './components/Menus';
import PrivateRoute from './components/PrivateRoute';

// Lazy load components
const Register = lazy(() => import('./components/Register'));
const LandingPage = lazy(() => import('./components/LandingPage'));
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
  const [user, setUser] = useState({ name: '', photo: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Optionally fetch user details if needed
      // Example: fetchUserDetails(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const updateUserProfile = (newDetails) => {
    setUser((prevUser) => ({ ...prevUser, ...newDetails }));
  };

  const MainContent = () => {
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    return (
      <div className="app">
        {isAuthenticated && isDashboard && <Menus user={user} />}
        <div className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/request-password-reset" element={<RequestPasswordReset />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* Private Routes */}
              <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
              <Route path="/orders" element={<PrivateRoute element={<Orders />} isAuthenticated={isAuthenticated} />} />
              <Route path="/wallet-statement" element={<PrivateRoute element={<WalletStatement />} isAuthenticated={isAuthenticated} />} />
              <Route path="/products" element={<PrivateRoute element={<Products />} isAuthenticated={isAuthenticated} />} />
              <Route path="/cart" element={<PrivateRoute element={<Cart />} isAuthenticated={isAuthenticated} />} />
              <Route path="/reports" element={<PrivateRoute element={<Reports />} isAuthenticated={isAuthenticated} />} />
              <Route path="/support" element={<PrivateRoute element={<Support />} isAuthenticated={isAuthenticated} />} />
              <Route path="/faq" element={<PrivateRoute element={<FAQ />} isAuthenticated={isAuthenticated} />} />
              <Route path="/logout" element={<PrivateRoute element={<Logout />} isAuthenticated={isAuthenticated} />} />
              
              <Route path="/delivery-method" element={<PrivateRoute element={<DeliveryMethod />} isAuthenticated={isAuthenticated} />} />
              <Route path="/delivery-details" element={<PrivateRoute element={<DeliveryDetails />} isAuthenticated={isAuthenticated} />} />
              <Route path="/product-brands" element={<PrivateRoute element={<ProductBrands />} isAuthenticated={isAuthenticated} />} />
              <Route path="/product-details" element={<PrivateRoute element={<ProductDetails />} isAuthenticated={isAuthenticated} />} />
              <Route path="/order-summary" element={<PrivateRoute element={<OrderSummary />} isAuthenticated={isAuthenticated} />} />
              <Route path="/schedule-delivery" element={<PrivateRoute element={<ScheduleDelivery />} isAuthenticated={isAuthenticated} />} />
              <Route path="/schedule-delivery-summary" element={<PrivateRoute element={<ScheduleDeliverySummary />} isAuthenticated={isAuthenticated} />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile updateUserProfile={updateUserProfile} />} isAuthenticated={isAuthenticated} />} />
              <Route path="/users" element={<PrivateRoute element={<Users />} isAuthenticated={isAuthenticated} />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <MainContent />
    </Router>
  );
};

export default App;
