// client/src/components/DeliveryDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DeliveryDetails.css';
import companyLogo from '../assets/NgRob.png'; // Import the logo image

const DeliveryDetails = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [account, setAccount] = useState('');
    const [plant, setPlant] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');

    //const location = useLocation();
    const navigate = useNavigate();
    //const { deliveryMethod } = location.state;

    useEffect(() => {
        // Fetch countries from API
        const fetchCountries = async () => {
            try {
                const response = await axios.get('/api/delivery/countries');
                if (Array.isArray(response.data)) {
                    setCountries(response.data);
                } else {
                    console.error('API response is not an array:', response.data);
                }
            } catch (err) {
                console.error('Error fetching countries:', err);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            // Fetch states based on the selected country
            const fetchStates = async () => {
                try {
                    const response = await axios.get(`/api/delivery/states/${selectedCountry}`);
                    if (Array.isArray(response.data)) {
                        setStates(response.data);
                    } else {
                        console.error('API response is not an array:', response.data);
                    }
                } catch (err) {
                    console.error('Error fetching states:', err);
                }
            };

            fetchStates();
        }
    }, [selectedCountry]);

    const handleProceed = () => {
        navigate('/product-brands');
    };

    return (
        <div className="delivery-details-container">
            {/* Add the company logo */}
            <img src={companyLogo} alt="Company Logo" className="company-logo" />

            <h1>Delivery Details</h1>
            <div>
                <label>
                    Delivery Country:
                    <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                        <option value="">Select a country</option>
                        <option value="Nigeria">Nigeria</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Delivery State:
                    <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                        <option value="">Select a state</option>
                        <option value="Abia">Abia</option>
                        <option value="Adamawa">Adamawa</option>
                        <option value="Akwa Ibom">Akwa Ibom</option>
                        <option value="Anambra">Anambra</option>
                        <option value="Bauchi">Bauchi</option>
                        <option value="Bayelsa">Bayelsa</option>
                        <option value="Benue">Benue</option>
                        <option value="Delta">Delta</option>
                        <option value="Rivers">Rivers</option>
                        <option value="Cross River">Cross River</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Imo">Imo</option>
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Customer Account:
                    <select value={account} onChange={(e) => setAccount(e.target.value)}>
                        <option value="Account1">Account1</option>
                        <option value="Account2">Account2</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Plant/Depot:
                    <select value={plant} onChange={(e) => setPlant(e.target.value)}>
                        <option value="Ibese">Ibese</option>
                        <option value="Obajana">Obajana</option>
                        <option value="Okpella">Okpella</option>
                        <option value="Gboko">Gboko</option>
                        <option value="Aba">Aba</option>
                        <option value="Owerri">Owerri</option>
                        <option value="Yenagoa">Yenagoa</option>
                        <option value="P.H2">P.H2</option>
                        <option value="P.H3">P.H3</option>
                        <option value="Onne">Onne</option>
                        <option value="Lekki">Lekki</option>
                        <option value="Oniru">Oniru</option>
                        <option value="Ikorodu">Ikorodu</option>
                    </select>
                </label>
            </div>
            <button onClick={handleProceed}>Proceed</button>
        </div>
    );
};

export default DeliveryDetails;
