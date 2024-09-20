// client/src/components/ProductBrands.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProductBrands.css';
import companyLogo from '../assets/NgRob.png'; // Import logo

const ProductBrands = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { deliveryMethod, selectedCountry, selectedState, account, plant } = location.state || {};

    const productBrands = [
        "Blocmaster",
        "NGR3X.42.5R IBESE",
        "NGR3X.42.5N OKPELLA Self Collection",
        "NGR3X.42.5R OBAJANA",
        "3X.42.5N IBESE",
        "NGN.Falcon Cement 32.5R",
        "NGN.52.5N GBOKO",
        // Add more product brands
    ];

    const filteredBrands = productBrands.filter(brand =>
        brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBrandClick = (brand) => {
        navigate('/product-details', { state: { brand, deliveryMethod, selectedCountry, selectedState, account, plant } });
    };

    return (
        <div className="product-brands-container">
            {/* Add the company logo */}
            <img src={companyLogo} alt="Company Logo" className="company-logo" />
            
            <h1>Product Brands</h1>

            <input
                type="text"
                placeholder="Search for a product brand"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            <ul className="brand-list">
                {filteredBrands.map((brand) => (
                    <li key={brand}>
                        <button className="brand-button" onClick={() => handleBrandClick(brand)}>
                            {brand}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="button-container">
                <button className="back-button" onClick={() => navigate(-1)}>&lt;&lt; Back</button>
                <button className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
            </div>
        </div>
    );
};

export default ProductBrands;
