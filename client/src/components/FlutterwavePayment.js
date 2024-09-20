import React, { useState } from 'react';
import './FlutterwavePayment.css'; // Ensure to have styles for layout and payment status

const FlutterwavePayment = () => {
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleFlutterwavePayment = () => {
    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      setPaymentStatus('Please enter a valid amount.');
      return;
    }

    const config = {
      public_key: 'YOUR_FLUTTERWAVE_PUBLIC_KEY',
      tx_ref: Date.now(), // A unique transaction reference
      amount: amount,
      currency: 'NGN', // Adjust currency if needed
      payment_options: 'card',
      redirect_url: 'http://localhost:3000/payment/flutterwave/callback', // Replace with your callback route
      customer: {
        email: 'user@example.com', // Replace with dynamic user email
        phone_number: '1234567890', // Replace with dynamic user phone number
        name: 'John Doe', // Replace with dynamic user name
      },
      customizations: {
        title: 'Wallet Top-Up',
        description: 'Top up your wallet account',
        logo: 'https://yourdomain.com/flutterwave.png', // Replace with your logo URL
      },
    };

    // Call Flutterwave's checkout handler
    window.FlutterwaveCheckout(config);
  };

  return (
    <div className="flutterwave-payment-container">
      <h2>Flutterwave Payment</h2>
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
      <button onClick={handleFlutterwavePayment}>Pay with Flutterwave</button>
      {paymentStatus && <div className="payment-status">{paymentStatus}</div>}
    </div>
  );
};

export default FlutterwavePayment;
