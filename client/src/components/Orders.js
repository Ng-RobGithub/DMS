import React, { useEffect, useState } from 'react';
//import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
     try {
        //const res = await axios.get('/api/orders');

        const response = await fetch('/api/orders');
        const data = await response.json();
        //const orders = ordersDataResponse.data;
        setOrders(data); // Set the full list of orders

        //setOrders(res.data); // Assuming `res.data` is an array of order objects
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recent Orders</h2>
      {/* Display the orders in a table format */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Order Number</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Total Amount ($)</th>
            <th style={{ padding: '10px' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: '10px', textAlign: 'center' }}>
                No recent orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{order.orderNumber || 'N/A'}</td>
                <td style={{ padding: '10px' }}>{order.status || 'N/A'}</td>
                <td style={{ padding: '10px' }}>
                  {typeof order.totalAmount === 'number' ? order.totalAmount.toFixed(2) : '0.00'}
                </td>
                <td style={{ padding: '10px' }}>
                  {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
