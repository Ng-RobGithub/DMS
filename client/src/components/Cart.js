// src/components/Cart.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import companyLogo from '../assets/NgRob.png';
import api from '../api';
import { WalletContext } from '../provider/walletProvider';

const Cart = () => {
  const navigate = useNavigate();
  const { availableBalance, setAvailableBalance } = useContext(WalletContext);

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/cart');
        setCartItems(response.data);
        const total = response.data.totalPrice;
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const remainingBalance = availableBalance - totalAmount;

  // Handle item deletion
  const handleDelete = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      const updatedTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalAmount(updatedTotal);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle saving the cart and updating wallet balance
  const handleSave = async () => {
    if (remainingBalance < 0) {
      alert('Insufficient balance to complete the transaction.');
      return;
    }

    try {
      await api.post('/wallet/update', { amount: -totalAmount });
      setAvailableBalance((prev) => prev - totalAmount);
      navigate('/order-confirmation', { state: { totalAmount, cartItems } });
    } catch (error) {
      console.error('Error updating wallet balance:', error);
      alert('Failed to update wallet balance.');
    }
  };

  return (
    <div className="cart-container">
      <div className="logo-container">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
      </div>

      <h1>Cart</h1>
      <p>Available Balance: NGN {availableBalance.toFixed(2)}</p>
      <p>Remaining Balance: NGN {Math.max(remainingBalance, 0).toFixed(2)}</p>

      {cartItems.length > 0 ? (
        <div className="cart-items">
          <h2>Cart Items</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <p className="item-detail">Product Brand: {item.product.brand}</p>
                <p className="item-detail">Quantity: {item.quantity}</p>
                <p className="item-detail">Price: NGN {item.price}</p>
                <button onClick={() => handleDelete(item._id)} className="delete-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <p>Total Amount: NGN {totalAmount.toFixed(2)}</p>
          </div>
          <div className="cart-buttons">
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
