import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Import the CSS for styling
import companyLogo from '../assets/NgRob.png'; // Import the company logo
import api from '../api'; // Adjust the import according to your API file

const Cart = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [walletBalance, setWalletBalance] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
        const total = savedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalAmount(total);
        
        // Fetch wallet balance from the database
        const fetchWalletBalance = async () => {
            try {
                const response = await api.get('/wallet'); // Adjust endpoint as needed
                setWalletBalance(response.data.availableBalance); // Ensure this matches your API response structure
            } catch (error) {
                console.error('Error fetching wallet balance:', error);
            }
        };

        fetchWalletBalance();
    }, []);

    const remainingBalance = walletBalance - totalAmount;

    const handleDelete = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        const total = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalAmount(total);
    };

    const handleSave = async () => {
        console.log('Save the cart');
        if (remainingBalance < 0) {
            alert('Insufficient balance to complete the transaction.');
            return;
        }

        // Prepare order details
        const orderDetails = {
            id: new Date().getTime(), // Unique order ID based on timestamp
            totalAmount,
            items: cart.map(item => ({
                brand: item.brand,
                quantity: item.quantity,
                price: item.price * item.quantity,
            })),
        };

        // Update wallet and available balances on the server
        try {
            await api.post('/wallet/update', { amount: -totalAmount }); // Deducting the total amount
            setWalletBalance(prevBalance => prevBalance - totalAmount); // Update local state
            
            // Clear the cart
            setCart([]);
            setTotalAmount(0);
            localStorage.removeItem('cart'); // Clear cart from local storage

            // Navigate to order confirmation page with order details
            navigate('/order-confirmation', { state: { orderDetails } }); // Pass order details to the confirmation page
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
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="cart-container">
            {/* Logo placed at the top left */}
            <div className="logo-container">
                <img src={companyLogo} alt="Company Logo" className="company-logo" />
            </div>

            <h1>Cart</h1>
            <p>Available Balance: NGN {walletBalance.toFixed(2)}</p>
            <p>Remaining Balance: NGN {remainingBalance >= 0 ? remainingBalance.toFixed(2) : 0}</p>
            {cart.length > 0 ? (
                <div className="cart-items">
                    <h2>Cart Items</h2>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                                <p className="item-detail">Product Brand: {item.brand}</p>
                                <p className="item-detail">Quantity Ordered: {item.quantity}</p>
                                <p className="item-detail">Total Amount: NGN {item.price * item.quantity}</p>
                                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
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
                <button onClick={handleBack}>{"<< Back"}</button>
            </div>
        </div>
    );
};

export default Cart;
