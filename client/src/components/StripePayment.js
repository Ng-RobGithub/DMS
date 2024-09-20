import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './StripePayment.css'; // Ensure this file contains your styling

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY');

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure Stripe.js is loaded and elements are available
    if (!stripe || !elements) {
      return;
    }

    // Validate amount input
    if (!amount || isNaN(amount) || amount <= 0) {
      setPaymentStatus('Please enter a valid amount.');
      return;
    }

    // Get the card details from CardElement
    const cardElement = elements.getElement(CardElement);

    try {
      // Create the payment method using Stripe
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setPaymentStatus(`Error: ${error.message}`);
        return;
      }

      // Send payment details to the backend for processing
      const response = await axios.post('/api/payment/stripe', {
        paymentMethodId: paymentMethod.id,
        amount: Math.round(parseFloat(amount) * 100), // Convert to cents
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
    <div className="stripe-payment-container">
      <h2>Stripe Payment</h2>
      <form onSubmit={handleSubmit}>
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
        <CardElement />
        <button type="submit" disabled={!stripe}>Pay Now</button>
      </form>
      {paymentStatus && <div className="payment-status">{paymentStatus}</div>}
    </div>
  );
};

const StripePayment = () => (
  <Elements stripe={stripePromise}>
    <StripePaymentForm />
  </Elements>
);

export default StripePayment;
