// client/src/components/DeliveryMethod.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryMethod = () => {
    const navigate = useNavigate();

    const handleMethodSelect = (event) => {
        const method = event.target.value;
        if (method) {
            navigate('/delivery-details', { state: { deliveryMethod: method } });
        }
    };

    return (
        <div>
            <h1>Select Delivery Method</h1>
            <label>
                Delivery Method:
                <select onChange={handleMethodSelect}>
                    <option value="">Select a method</option>
                    <option value="Plant/Direct Delivery by NG-ROB">Plant/Direct Delivery by NG-ROB</option>
                    <option value="Self-Collection by Customer">Self-Collection by Customer</option>
                    <option value="CTES/CTES Plus">CTES/CTES Plus</option>
                </select>
            </label>
        </div>
    );
};

export default DeliveryMethod;
