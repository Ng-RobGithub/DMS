// client/src/components/ProductBrands.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
        <div>
            <h1>Product Brands</h1>
            <input
                type="text"
                placeholder="Search for a product brand"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredBrands.map((brand) => (
                    <li key={brand} onClick={() => handleBrandClick(brand)}>
                        {brand}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate(-1)}>&lt;&lt; Back</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
};

export default ProductBrands;
