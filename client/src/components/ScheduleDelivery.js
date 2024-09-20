import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ScheduleDelivery.css'; // Import CSS for styling
import companyLogo from '../assets/NgRob.png'; // Import the company logo

const ScheduleDelivery = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { deliveryState, deliveryCountry } = location.state || {};

    const statesInNigeria = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
        'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe',
        'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
        'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
        'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT'
    ];

    const countries = ['Nigeria']; // Add more countries if needed

    const [paymentReference, setPaymentReference] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [truckSize, setTruckSize] = useState('15T');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [selectedState, setSelectedState] = useState(deliveryState || '');
    const [selectedCountry, setSelectedCountry] = useState(deliveryCountry || 'Nigeria');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!paymentReference) newErrors.paymentReference = 'Payment reference is required';
        if (!paymentDate) newErrors.paymentDate = 'Payment date is required';
        if (!deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
        if (!deliveryAddress) newErrors.deliveryAddress = 'Delivery address is required';
        if (!selectedState) newErrors.selectedState = 'State is required';
        if (!selectedCountry) newErrors.selectedCountry = 'Country is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProceed = () => {
        if (validateForm()) {
            navigate('/schedule-delivery-summary', {
                state: {
                    deliveryState: selectedState,
                    deliveryCountry: selectedCountry,
                    paymentReference,
                    paymentDate,
                    deliveryDate,
                    truckSize,
                    deliveryAddress
                }
            });
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const handleSave = () => {
        if (validateForm()) {
            const orderData = {
                deliveryState: selectedState,
                deliveryCountry: selectedCountry,
                paymentReference,
                paymentDate,
                deliveryDate,
                truckSize,
                deliveryAddress
            };
            localStorage.setItem('savedOrder', JSON.stringify(orderData));
            alert('Order saved. You can continue where you left off next time.');
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const handleCancel = () => {
        localStorage.removeItem('savedOrder');
        navigate('/');
    };

    useEffect(() => {
        const savedOrder = localStorage.getItem('savedOrder');
        if (savedOrder) {
            const orderData = JSON.parse(savedOrder);
            setPaymentReference(orderData.paymentReference || '');
            setPaymentDate(orderData.paymentDate || '');
            setDeliveryDate(orderData.deliveryDate || '');
            setTruckSize(orderData.truckSize || '15T');
            setDeliveryAddress(orderData.deliveryAddress || '');
            setSelectedState(orderData.deliveryState || '');
            setSelectedCountry(orderData.deliveryCountry || 'Nigeria');
        }
    }, []);

    return (
        <div className="schedule-delivery-container">
            {/* Logo placed at the top left */}
            <div className="logo-container">
                <img src={companyLogo} alt="Company Logo" className="company-logo" />
            </div>

            <h1>Schedule Delivery</h1>
            <form>
                <div className="form-group">
                    <label>Payment Document/Reference Number</label>
                    <input 
                        type="text" 
                        value={paymentReference} 
                        onChange={(e) => setPaymentReference(e.target.value)} 
                        placeholder="Enter payment reference"
                    />
                    {errors.paymentReference && <div className="error">{errors.paymentReference}</div>}
                </div>
                <div className="form-group">
                    <label>Payment Date</label>
                    <input 
                        type="date" 
                        value={paymentDate} 
                        onChange={(e) => setPaymentDate(e.target.value)} 
                    />
                    {errors.paymentDate && <div className="error">{errors.paymentDate}</div>}
                </div>
                <div className="form-group">
                    <label>Delivery Date</label>
                    <input 
                        type="date" 
                        value={deliveryDate} 
                        onChange={(e) => setDeliveryDate(e.target.value)} 
                        min={paymentDate}
                    />
                    {errors.deliveryDate && <div className="error">{errors.deliveryDate}</div>}
                </div>
                <div className="form-group">
                    <label>Truck Size</label>
                    <select value={truckSize} onChange={(e) => setTruckSize(e.target.value)}>
                        <option value="15T">15T</option>
                        <option value="30T">30T</option>
                        <option value="40T">40T</option>
                        <option value="45T">45T</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Delivery Address</label>
                    <input 
                        type="text" 
                        value={deliveryAddress} 
                        onChange={(e) => setDeliveryAddress(e.target.value)} 
                        placeholder="Enter delivery address"
                    />
                    {errors.deliveryAddress && <div className="error">{errors.deliveryAddress}</div>}
                </div>
                <div className="form-group">
                    <label>Delivery State</label>
                    <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                        <option value="">Select State</option>
                        {statesInNigeria.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    {errors.selectedState && <div className="error">{errors.selectedState}</div>}
                </div>
                <div className="form-group">
                    <label>Delivery Country</label>
                    <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                        <option value="Nigeria">Nigeria</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                    {errors.selectedCountry && <div className="error">{errors.selectedCountry}</div>}
                </div>
                <div className="schedule-delivery-buttons">
                    <button type="button" onClick={handleProceed}>Proceed</button>
                    <button type="button" onClick={handleSave}>Save</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="button" onClick={() => navigate(-1)}>&lt;&lt; Back</button>
                </div>
            </form>
        </div>
    );
};

export default ScheduleDelivery;
