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
        confirmPassword: '',
        otp: ''
    });

    const { fullName, email, phoneNumber, country, company, customerId, password, confirmPassword, otp } = formData;
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const navigate = useNavigate();

    const africanCountries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Uganda', 'Tanzania', 'Rwanda', 'Egypt', 'Morocco'];

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const sendOtp = async () => {
        try {
            const otpResponse = await axios.post('http://localhost:5000/api/otp/generate', { email });
            if (otpResponse.status === 200) {
                setOtpSent(true);
                alert('An OTP has been sent to your email.');
            } else {
                alert('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || 'Failed to send OTP. Please try again.');
        }
    };

    const verifyOtp = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/otp/verify', { email, otp });
            if (response.status === 200) {
                setOtpVerified(true);
                alert('OTP verified successfully. You can now complete the registration.');
            } else {
                alert('Invalid or expired OTP');
            }
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || 'Invalid or expired OTP');
        }
    };

    const registerUser = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (!otpVerified) {
            alert('Please verify OTP first');
            return;
        }
        try {
            const registerResponse = await axios.post('http://localhost:5000/api/auth/register', {
                fullName,
                email,
                phoneNumber,
                country,
                company,
                customerId,
                password
            });
            if (registerResponse.status === 200) {
                navigate('/login'); // Redirect to login page
            }
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h1>Register</h1>
                <p>Kindly select your company and enter customer ID to register your account</p>
                <form onSubmit={otpSent ? verifyOtp : registerUser}>
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
                    {otpSent && (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                name="otp"
                                value={otp}
                                onChange={onChange}
                                required
                            />
                        </div>
                    )}
                    <p className="privacy-policy">Click here to view and accept our <Link to="/privacy-policy">privacy policy</Link>.</p>
                    <button type="submit">{otpSent ? 'Verify OTP' : 'Register'}</button>
                </form>
                {otpVerified && !otpSent && (
                    <form onSubmit={registerUser}>
                        <button type="submit">Confirm Registration</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Register;
