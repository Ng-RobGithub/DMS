// client/src/components/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState({
    currentWalletBalance: 0,
    remainingBalance: 0,
    totalPrice: 0,
    items: [],
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCart(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  const handleProceed = async () => {
    try {
      // Proceed with the order
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <div>
        <p>Current Wallet Balance: {cart.currentWalletBalance}</p>
        <p>Remaining Balance: {cart.remainingBalance}</p>
        <p>Total Price: {cart.totalPrice}</p>
      </div>
      <button onClick={handleProceed}>Proceed</button>
    </div>
  );
};

export default Cart;
