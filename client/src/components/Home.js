import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you have a CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Home</h1>
      <p>Welcome to the Distributor Management System</p>

      <div className="home-links">
        <Link to="/profile" className="home-link">View Profile</Link>
        <Link to="/orders" className="home-link">View Orders</Link>
        <Link to="/products" className="home-link">Browse Products</Link>
        <Link to="/reports" className="home-link">View Reports</Link>
        <Link to="/support" className="home-link">Get Support</Link>
        <Link to="/faq" className="home-link">FAQ</Link>
        <Link to="/wallet-statement" className="home-link">Wallet Statement</Link>
        <Link to="/cart" className="home-link">Cart</Link>
        <Link to="/payment" className="home-link">Payment</Link>
        <Link to="/logout" className="home-link">Logout</Link>
      </div>
    </div>
  );
};

export default Home;
