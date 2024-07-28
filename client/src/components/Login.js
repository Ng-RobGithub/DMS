import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');

    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onOtpChange = e => setOtp(e.target.value);

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            // Send OTP
            await axios.post('/api/otp/generate', { email });
            setIsOtpSent(true);
        } catch (error) {
            setError(error.response?.data.message || error.message);
        }
    };

    const onOtpSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/otp/verify', { email, otp });
            navigate('/home');
        } catch (error) {
            setError(error.response?.data.message || error.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Login</h1>
                {!isOtpSent ? (
                    <form onSubmit={onSubmit}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                ) : (
                    <form onSubmit={onOtpSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                name="otp"
                                value={otp}
                                onChange={onOtpChange}
                                required
                            />
                        </div>
                        <button type="submit">Verify OTP</button>
                    </form>
                )}
                {error && <p className="error-message">{error}</p>}
                <p className="privacy-policy">
                    By logging in, you agree to our <Link to="/privacy-policy">Privacy Policy</Link>.
                </p>
                <p className="register-link">
                    Don't have an account? <Link to="/register">Register here</Link>.
                </p>
            </div>
        </div>
    );
};

export default Login;
