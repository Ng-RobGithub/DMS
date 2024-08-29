// client/src/components/Menus.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menus.css';

const Menus = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menus">
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      {isOpen && (
        <div className="menu-items">
          {/* Profile Section */}
          <div className="user-profile">
            <img src={user.photo} alt="Profile" />
            <p>{user.name}</p>
            <Link to="/profile" className="profile-link">View Profile</Link>
          </div>
          {/* Navigation Links */}
          <nav>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/wallet-statement">Wallet Statement</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/reports">Reports</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Menus;
