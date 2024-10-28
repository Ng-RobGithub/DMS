import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');

  const handleTracking = async () => {
    try {
      const response = await axios.get(`/order/${orderId}/tracking`);
      setOrderDetails(response.data);
      setError('');
    } catch (err) {
      setError('Order not found');
    }
  };

  return (
    <div className="order-tracking">
      <h2>Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={handleTracking}>Track</button>

      {error && <p className="error">{error}</p>}
      {orderDetails && (
        <div className="order-details">
          <h3>Order Status: {orderDetails.orderStatus}</h3>
          <h4>Tracking Number: {orderDetails.trackingNumber}</h4>
          <p>
            Estimated Delivery Time:{' '}
            {orderDetails.shippingInfo.estimatedDeliveryTime}
          </p>
          <h5>Order History:</h5>
          <ul>
            {orderDetails.orderHistory.map((entry, index) => (
              <li key={index}>
                <span>{entry.timestamp}</span>: {entry.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
