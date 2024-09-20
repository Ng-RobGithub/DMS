import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryMethod.css'; // Import the corresponding CSS file for styling
import companyLogo from '../assets/NgRob.png'; // Import your company logo

const DeliveryMethod = () => {
    const navigate = useNavigate();

    const handleMethodSelect = (event) => {
        const method = event.target.value;
        if (method) {
            navigate('/delivery-details', { state: { deliveryMethod: method } });
        }
    };

    return (
        <div className="delivery-method-container">
            {/* Logo placed in the top left corner */}
            <div className="logo-container">
                <img src={companyLogo} alt="Company Logo" className="company-logo" />
            </div>

            <h1>Delivery Method</h1>
            <label>
                <select onChange={handleMethodSelect}>
                    <option value="">Select Delivery method</option>
                    <option value="Plant/Direct Delivery by NG-ROB">Plant/Direct Delivery by NG-ROB</option>
                    <option value="Self-Collection by Customer">Self-Collection by Customer</option>
                    <option value="CTES/CTES Plus">CTES/CTES Plus</option>
                </select>
            </label>
        </div>
    );
};

export default DeliveryMethod;
