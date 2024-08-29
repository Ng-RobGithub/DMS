// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">DMS</div>
        <nav className="nav-menu">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </nav>
        <div className="user-profile">
          <img src="/path/to/profile-picture.jpg" alt="User" />
          <div className="user-name">
            <span>John Doe</span>
            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <Link to="/logout">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Banner */}
      <section className="main-banner">
        <h1>Welcome to Distributor Management System</h1>
        <p>Manage your orders, track your balance, and more.</p>
        <div className="metrics-overview">
          <div className="metric">
            <h2>Total Balance</h2>
            <p>$5,000</p>
          </div>
          <div className="metric">
            <h2>Available Balance</h2>
            <p>$3,500</p>
          </div>
          <div className="metric">
            <h2>New Orders</h2>
            <p>5</p>
          </div>
        </div>
      </section>

      {/* Dashboard Summary */}
      <section className="dashboard-summary">
        <h2>Quick Links</h2>
        <div className="quick-links">
          <Link to="/orders" className="quick-link">My Orders</Link>
          <Link to="/wallet" className="quick-link">Wallet Statement</Link>
          <Link to="/reports" className="quick-link">Reports</Link>
        </div>
        <h2>Recent Activity</h2>
        <div className="recent-activity">
          <p>Order #12345 - Submitted on 08/23/2024</p>
          <p>Order #12344 - Saved on 08/22/2024</p>
          <p>Order #12343 - Submitted on 08/21/2024</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2>Featured Products</h2>
        <div className="featured-products">
          <div className="product-card">
            <img src="/path/to/product-image1.jpg" alt="Product 1" />
            <h3>Product 1</h3>
            <p>$100</p>
            <Link to="/product/1" className="view-details">View Details</Link>
          </div>
          <div className="product-card">
            <img src="/path/to/product-image2.jpg" alt="Product 2" />
            <h3>Product 2</h3>
            <p>$200</p>
            <Link to="/product/2" className="view-details">View Details</Link>
          </div>
          <div className="product-card">
            <img src="/path/to/product-image3.jpg" alt="Product 3" />
            <h3>Product 3</h3>
            <p>$300</p>
            <Link to="/product/3" className="view-details">View Details</Link>
          </div>
        </div>
      </section>

      {/* Announcements/News Section */}
      <section className="announcements-section">
        <h2>Latest Announcements</h2>
        <div className="announcements">
          <p>New product launch - Product X now available!</p>
          <p>System maintenance scheduled for 08/25/2024.</p>
          <p>New features added to the DMS platform.</p>
        </div>
      </section>

      {/* Support Section */}
      <section className="support-section">
        <h2>Need Help?</h2>
        <div className="support-links">
          <Link to="/support">Contact Support</Link>
          <Link to="/faq">FAQ</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <p>&copy; 2024 DMS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
