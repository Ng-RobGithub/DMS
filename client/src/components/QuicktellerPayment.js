import React, { useState } from 'react';
import axios from 'axios';
import './QuicktellerPayment.css'; // Ensure this file contains the required styling

const QuicktellerPayment = () => {
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleQuicktellerPayment = async () => {
    // Validate amount input
    if (!amount || isNaN(amount) || amount <= 0) {
      setPaymentStatus('Please enter a valid amount.');
      return;
    }

    try {
      const response = await axios.post('/api/payment/quickteller', {
        amount: Math.round(parseFloat(amount) * 100), // Convert to kobo if needed
        currency: 'NGN', // Adjust if necessary
      });

      if (response.data.success) {
        // Redirect user to Quickteller payment page or handle as needed
        window.location.href = response.data.paymentUrl;
      } else {
        setPaymentStatus(`Payment failed: ${response.data.message}`);
      }
    } catch (error) {
      setPaymentStatus(`Payment failed: ${error.message}`);
    }
  };

  return (
    <div className="quickteller-payment-container">
      <h2>Quickteller Payment</h2>
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
      <button onClick={handleQuicktellerPayment}>Pay with Quickteller</button>
      {paymentStatus && <div className="payment-status">{paymentStatus}</div>}
    </div>
  );
};

export default QuicktellerPayment;
