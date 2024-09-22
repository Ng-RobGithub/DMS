import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ScheduleDeliverySummary.css';
import logo from '../assets/NgRob.png'; // Update the path based on your project structure

const ScheduleDeliverySummary = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        deliveryState, deliveryCountry, paymentReference,
        paymentDate, deliveryDate, truckSize, deliveryAddress
    } = location.state || {};

    const [orderCreated, setOrderCreated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleBack = () => {
        navigate('/schedule-delivery', { state: location.state });
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleCheckout = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
    
            // Send the request to create an order
            const response = await axios.post('http://localhost:5000/api/delivery/checkout', {
                paymentReference,
                paymentDate,
                deliveryDate,
                truckSize,
                deliveryAddress,
                deliveryState,
                deliveryCountry
            }, config);
    
            if (response.data.success) {
                const { parentOrderNumber } = response.data;  // Extract parentOrderNumber
                console.log(`Order created with Parent Order Number: ${parentOrderNumber}`);
                setOrderCreated(true);
                alert(`Order summary sent to your email. Parent Order Number: ${parentOrderNumber}`);
            } else {
                setError('Failed to create the order. Please try again.');
            }
        } catch (error) {
            console.error('Error during checkout:', error.response?.data || error.message);
            setError('Failed to create the order. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="schedule-delivery-summary-container">
            <img src={logo} alt="Company Logo" className="logo" />
            <h1>Delivery Summary</h1>
            <div className="summary">
                <p><strong>Payment Reference:</strong> {paymentReference}</p>
                <p><strong>Payment Date:</strong> {paymentDate}</p>
                <p><strong>Delivery Date:</strong> {deliveryDate}</p>
                <p><strong>Truck Size:</strong> {truckSize}</p>
                <p><strong>Delivery Address:</strong> {deliveryAddress}</p>
                <p><strong>Delivery State:</strong> {deliveryState}</p>
                <p><strong>Delivery Country:</strong> {deliveryCountry}</p>
            </div>
            <div className="summary-buttons">
                <button onClick={handleBack}>&lt;&lt; Back</button>
                <button onClick={handleCancel}>Cancel</button>
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {orderCreated ? (
                    <p>Order Successfully Created</p>
                ) : (
                    <button onClick={handleCheckout}>Checkout</button>
                )}
            </div>
        </div>
    );
};

export default ScheduleDeliverySummary;
