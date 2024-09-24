import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderConfirmation.css'; // Optional: Create a CSS file for styling

const OrderConfirmation = () => {
    const location = useLocation();
    const { orderDetails } = location.state || {};

    return (
        <div className="order-confirmation-container">
            <h1>Order Confirmation</h1>
            <p>Your order has been successfully placed!</p>
            {orderDetails ? (
                <div className="order-details">
                    <h2>Order Details:</h2>
                    <p><strong>Order ID:</strong> {orderDetails.id}</p>
                    <p><strong>Total Amount:</strong> NGN {orderDetails.totalAmount?.toFixed(2) || '0.00'}</p>
                    <p><strong>Items Ordered:</strong></p>
                    <ul>
                        {orderDetails.items?.map((item, index) => (
                            <li key={index}>
                                {item.brand} - Quantity: {item.quantity} - Price: NGN {item.price?.toFixed(2) || '0.00'}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No order details available.</p>
            )}
            <button onClick={() => window.location.href = '/cart'}>Go to Cart</button>
        </div>
    );
};

export default OrderConfirmation;
