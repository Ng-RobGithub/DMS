// src/components/Cart.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import companyLogo from '../assets/NgRob.png';
import api from '../api';
import { WalletContext } from '../provider/walletProvider';

const Cart = () => {
  const navigate = useNavigate();
  const { availableBalance, setAvailableBalance } = useContext(WalletContext); // Use the context

  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    const total = savedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotalAmount(total);
  }, []);

  const remainingBalance = availableBalance - totalAmount;

  const handleDelete = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    const total = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotalAmount(total);
  };

  const handleSave = async () => {
    if (remainingBalance < 0) {
      alert('Insufficient balance to complete the transaction.');
      return;
    }

    const orderDetails = {
      id: new Date().getTime(),
      totalAmount,
      items: cart.map((item) => ({
        brand: item.brand,
        quantity: item.quantity,
        price: item.price * item.quantity,
      })),
    };

    try {
      await api.post('/wallet/update', { amount: -totalAmount });
      setAvailableBalance((prevBalance) => prevBalance - totalAmount); // Update the context state
      setCart([]);
      setTotalAmount(0);
      localStorage.removeItem('cart');
      navigate('/order-confirmation', { state: { orderDetails } });
    } catch (error) {
      console.error('Error updating wallet balance:', error);
      alert('Failed to update wallet balance.');
    }
  };

  const handleScheduleDelivery = () => {
    navigate('/schedule-delivery');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="cart-container">
      <div className="logo-container">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
      </div>

      <h1>Cart</h1>
      <p>Available Balance: NGN {availableBalance.toFixed(2)}</p>
      <p>
        Remaining Balance: NGN{' '}
        {remainingBalance >= 0 ? remainingBalance.toFixed(2) : 0}
      </p>
      {cart.length > 0 ? (
        <div className="cart-items">
          <h2>Cart Items</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <p className="item-detail">Product Brand: {item.brand}</p>
                <p className="item-detail">Quantity Ordered: {item.quantity}</p>
                <p className="item-detail">
                  Total Amount: NGN {item.price * item.quantity}
                </p>
                <button
                  onClick={() => handleDelete(index)}
                  className="delete-button"
                >
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
      <div className="cart-footer-buttons">
        <button onClick={handleScheduleDelivery}>Schedule Delivery</button>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleBack}>{'<< Back'}</button>
      </div>
    </div>
  );
};

export default Cart;
