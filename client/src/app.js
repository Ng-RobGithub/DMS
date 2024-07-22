// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
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
import DeliveryDetails from './components/DeliveryDetails'; // Import the new component

const user = {
  name: 'John Doe',
  photo: 'path/to/profile/photo.jpg'
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Menus user={user} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wallet-statement" element={<WalletStatement />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/delivery-details" element={<DeliveryDetails />} /> {/* Add this line */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
