// client/src/components/VerifyOtp.js
import React, { useState } from 'react';
import axios from 'axios';

const VerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('/api/otp/verify', { email, otp });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to verify OTP');
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
