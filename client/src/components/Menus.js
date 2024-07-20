// client/src/components/Menus.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Menus.css';

const Menus = ({ user }) => {
  return (
    <div className="menus">
      <div className="user-profile">
        <img src={user.photo} alt="Profile" />
        <p>{user.name}</p>
      </div>
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
  );
};

export default Menus;
