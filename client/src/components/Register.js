import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        country: '',
        company: '',
        customerId: '',
        password: '',
        confirmPassword: ''
    });

    const { fullName, email, phoneNumber, country, company, customerId, password, confirmPassword } = formData;
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const africanCountries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Uganda', 'Tanzania', 'Rwanda', 'Egypt', 'Morocco'];

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const formatPhoneNumber = (number) => {
        if (number.startsWith('+')) {
            return number;
        } else if (number.startsWith('0')) {
            return `+234${number.slice(1)}`;
        } else {
            return `+234${number}`;
        }
    };

    const isValidPassword = (password) => {
        return password.length >= 8; // Example rule: password must be at least 8 characters long
    };

    const registerUser = async e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (!isValidPassword(password)) {
            setErrorMessage('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

            const registerResponse = await axios.post(`http://localhost:5000/api/auth/register`, {
                fullName,
                email,
                phoneNumber: formattedPhoneNumber,
                country,
                company,
                customerId,
                password
            });

            if (registerResponse.status === 201) {
                setSuccessMessage('Registration successful. You can now log in.');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setErrorMessage('Registration failed. Please check your details and try again.');
            }
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Registration failed. Please check your details and try again.');
            } else {
                setErrorMessage('Registration failed. Please check your details and try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h1>Register</h1>
                <p>Kindly select your company and enter customer ID to register your account</p>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={registerUser}>
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                            value={fullName}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <select name="country" value={country} onChange={onChange} required>
                            <option value="">Select Country</option>
                            {africanCountries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Company"
                            name="company"
                            value={company}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Customer I.D"
                            name="customerId"
                            value={customerId}
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
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <p className="privacy-policy">
                        By registering, you agree to our <Link to="/privacy-policy">privacy policy</Link>.
                    </p>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="login-link">
                    Already have an account? <Link to="/login">Log in here</Link>.
                </p>
            </div>
        </div>
    );
};

export default Register;
