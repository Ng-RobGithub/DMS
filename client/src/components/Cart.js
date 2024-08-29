import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Import the CSS for styling

const Cart = () => {
    const navigate = useNavigate();
    
    const [cart, setCart] = useState([]);
    const walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 10000000; // Retrieve wallet balance from localStorage or use default
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
        const total = savedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, []);

    const remainingBalance = walletBalance - totalPrice;

    const handleDelete = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        const total = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const handleSave = () => {
        console.log('Save the cart');
    };

    const handleScheduleDelivery = () => {
        navigate('/schedule-delivery');
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="cart-container">
            <h1>Cart</h1>
            <p>Current Wallet Balance: NGN {walletBalance.toFixed(2)}</p>
            <p>Remaining Balance: NGN {remainingBalance >= 0 ? remainingBalance.toFixed(2) : 0}</p>
            {cart.length > 0 ? (
                <div className="cart-items">
                    <h2>Cart Items</h2>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                                <p>Product Brand: {item.brand}</p>
                                <p>Quantity Ordered: {item.quantity}</p>
                                <p>Total Price: NGN {item.price * item.quantity}</p>
                                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
                            </li>
                        ))}
                    </ul>
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
                <button onClick={handleBack}>{"<< Back"}</button>
            </div>
        </div>
    );
};

export default Cart;
