// client/src/components/SendOtp.js
import React, { useState } from 'react';
import axios from 'axios';

const SendOtp = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('/api/otp/generate', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to send OTP');
    }
  };

  return (
    <div>
      <h2>Send OTP</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={handleSendOtp}>Send OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendOtp;
