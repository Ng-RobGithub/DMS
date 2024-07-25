import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ScheduleDeliverySummary.css';

const ScheduleDeliverySummary = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        deliveryState, deliveryCountry, paymentReference,
        paymentDate, deliveryDate, truckSize, deliveryAddress
    } = location.state || {};

    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState('');
    const [orderCreated, setOrderCreated] = useState(false);

    const handleBack = () => {
        navigate('/schedule-delivery', { state: location.state });
    };

    const handleCancel = () => {
        navigate('/');
    };

    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
    };

    const handleCheckout = async () => {
        try {
            const generatedOtp = generateOtp();
            setOtp(generatedOtp);

            // Send OTP to the user's email
            const response = await axios.post('/api/otp/send', {
                otp: generatedOtp,
                email: 'ngrob4real@gmail.com' // Replace with the actual user email
            });
            console.log(response.data.message);
            setOtpSent(true);
        } catch (error) {
            console.error('Error sending OTP:', error.response?.data || error.message);
            alert('Failed to send OTP. Please try again.');
        }
    };

    const handleValidateOtp = () => {
        if (enteredOtp === otp) {
            // Simulate order creation
            const parentOrderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
            console.log(`Order created with Parent Order Number: ${parentOrderNumber}`);
            setOrderCreated(true);

            // Simulate sending order summary to user's email
            const orderSummary = `
                Order Successfully Created with Parent Order Number: ${parentOrderNumber}
                Payment Reference: ${paymentReference}
                Payment Date: ${paymentDate}
                Delivery Date: ${deliveryDate}
                Truck Size: ${truckSize}
                Delivery Address: ${deliveryAddress}
                Delivery State: ${deliveryState}
                Delivery Country: ${deliveryCountry}
            `;
            console.log(`Order summary sent to user's email: ${orderSummary}`);
            alert('Order summary sent to your email.');
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    return (
        <div className="schedule-delivery-summary-container">
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
                {orderCreated ? (
                    <p>Order Successfully Created</p>
                ) : otpSent ? (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value)}
                        />
                        <button onClick={handleValidateOtp}>Validate OTP</button>
                    </>
                ) : (
                    <button onClick={handleCheckout}>Checkout</button>
                )}
            </div>
        </div>
    );
};

export default ScheduleDeliverySummary;
