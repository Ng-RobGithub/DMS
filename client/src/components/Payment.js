// client/src/components/Payment.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css'; // Rename CSS file accordingly

const Payment = () => {
  const navigate = useNavigate();

  const handlePaymentSelection = (gateway) => {
    navigate(`/payment/${gateway}`);
  };

  return (
    <div className="payment-container">
      <h1>Select a Payment Gateway</h1>
      <div className="payment-gateways">
        <button onClick={() => handlePaymentSelection('stripe')} className="gateway-btn stripe">
          <img src="/images/stripe.png" alt="Stripe" />
          Stripe
        </button>
        <button onClick={() => handlePaymentSelection('paypal')} className="gateway-btn paypal">
          <img src="/images/paypal.png" alt="PayPal" />
          PayPal
        </button>
        <button onClick={() => handlePaymentSelection('flutterwave')} className="gateway-btn flutterwave">
          <img src="/images/flutterwave.png" alt="Flutterwave" />
          Flutterwave
        </button>
        <button onClick={() => handlePaymentSelection('quickteller')} className="gateway-btn quickteller">
          <img src="/images/quickteller.png" alt="Quickteller" />
          Quickteller
        </button>
      </div>
    </div>
  );
};

export default Payment;
