import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import './PayPalPayment.css'; // Ensure you have styles in this file

const PayPalPayment = () => {
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      const transaction = details.purchase_units[0].payments.captures[0]; // Use this if needed

      // Use transaction details if necessary
      // Example: console.log(transaction);

      const response = await axios.post('/api/payment/paypal', {
        orderID: data.orderID,
        payerID: data.payerID,
        amount: Math.round(parseFloat(amount) * 100), // Convert to cents if needed
        currency: 'NGN', // Adjust currency as needed
      });

      if (response.data.success) {
        setPaymentStatus('Payment successful! Funds will reflect in your wallet shortly.');
      } else {
        setPaymentStatus(`Payment failed: ${response.data.message}`);
      }
    } catch (error) {
      setPaymentStatus(`Payment failed: ${error.message}`);
    }
  };

  return (
    <div className="paypal-payment-container">
      <h2>PayPal Payment</h2>
      <label>
        Amount (NGN):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
      </label>
      <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount || '0.01',
                  currency_code: 'NGN',
                },
              }],
            });
          }}
          onApprove={handleApprove}
          onError={(err) => {
            setPaymentStatus(`Payment failed: ${err.message}`);
          }}
        />
      </PayPalScriptProvider>
      {paymentStatus && <div className="payment-status">{paymentStatus}</div>}
    </div>
  );
};

export default PayPalPayment;
