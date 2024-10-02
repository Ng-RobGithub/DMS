import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import './Login.css';
import logo from '../assets/NgRob.png'; // Import your company logo

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      // Normalize email before sending (trim whitespace and convert to lowercase)
      const normalizedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      console.log('Sending request with email:', normalizedEmail);

      const response = await api.post('/auth/login', {
        email: normalizedEmail,
        password: trimmedPassword,
      });

      const token = response.data.token;
      if (token) {
        console.log('Login successful:', token);

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Debug log to ensure this part is reached
        console.log('Navigating to dashboard...');

        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        throw new Error('Token not provided by the server');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(
        err.response?.data?.message || 'Login failed. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Logo in the top-left corner */}
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Company Logo" className="company-logo" />
        </div>
      </div>

      {/* Centered login form */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        {error && <div className="error">{error}</div>}

        <div className="additional-links">
          <Link to="/reset-password">Forgot Password?</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
        <div className="register-link">
          <Link to="/register">Don't have an account? Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
