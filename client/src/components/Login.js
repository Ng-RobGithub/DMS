import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-links">
          <Link to="/password-reset">Forgot Password?</Link>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="additional-links">
        <p>
          Don't have an account? <Link to="/register">Click here to register</Link>
        </p>
        <p>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
