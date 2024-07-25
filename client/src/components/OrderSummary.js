import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSummary.css'; // Import the CSS for styling

const OrderSummary = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [walletBalance, setWalletBalance] = useState(0); 
    const [remainingBalance, setRemainingBalance] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);

        const balance = localStorage.getItem('walletBalance') || 10000; // Retrieve wallet balance
        setWalletBalance(Number(balance));

        const remaining = localStorage.getItem('remainingBalance') || 0;
        setRemainingBalance(Number(remaining));

        const total = savedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, []);

    const handleConfirmOrder = () => {
        // Handle order confirmation logic here
        console.log('Order confirmed');
        navigate('/'); // Redirect to home or confirmation page
    };

    const handleScheduleDelivery = () => {
        // Implement schedule delivery logic here
        console.log('Schedule Delivery');
        navigate('/schedule-delivery'); // Navigate to schedule delivery page
    };

    const handleSaveOrder = () => {
        // Implement save order logic here
        console.log('Save the order');
        localStorage.setItem('savedOrder', JSON.stringify(cart)); // Example saving logic
    };

    const handleCancelOrder = () => {
        navigate('/cart'); // Navigate back to the cart
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="order-summary-container">
            <h1>Order Summary</h1>
            <p>Current Wallet Balance: NGN {walletBalance}</p>
            <p>Remaining Balance: NGN {remainingBalance >= 0 ? remainingBalance : 0}</p>
            {cart.length > 0 ? (
                <div className="order-items">
                    <h2>Order Items</h2>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="order-item">
                                <p>Product Brand: {item.brand}</p>
                                <p>Quantity Ordered: {item.quantity}</p>
                                <p>Total Price: NGN {item.price * item.quantity}</p>
                            </li>
                        ))}
                    </ul>
                    <p>Total Order Price: NGN {totalPrice}</p>
                    <div className="order-buttons">
                        <button onClick={handleConfirmOrder}>Confirm Order</button>
                        <button onClick={handleScheduleDelivery}>Schedule Delivery</button>
                        <button onClick={handleSaveOrder}>Save</button>
                        <button onClick={handleCancelOrder}>Cancel Order</button>
                        <button onClick={handleBack}>&lt;&lt; Back</button>
                    </div>
                </div>
            ) : (
                <p className="empty-order">Your cart is empty.</p>
            )}
        </div>
    );
};

export default OrderSummary;
