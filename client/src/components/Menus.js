import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menus.css';
import logo from '../assets/NgRob1.png'; // Import your logo here

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
          {/* Logo */}
          <div className="logo-container">
            <img src={logo} alt="Company Logo" className="logo" />
          </div>

          {/* Profile Section */}
          <div className="user-profile">
            <img src={user.photo} alt="Profile" />
            <p>{user.name}</p>
            <Link to="/profile" className="profile-link">
              View Profile
            </Link>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/wallet-statement">Wallet Statement</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/reports">Reports</Link>
              </li>
              <li>
                <Link to="/payment">Payment</Link>
              </li>{' '}
              {/* Added Payment Link */}
              <li>
                <Link to="/promotion">promotion</Link>
              </li>
              <li>
                <Link to="/support">Support</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Menus;
