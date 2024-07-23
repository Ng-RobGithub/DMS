// client/src/components/ProductBrands.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductBrands = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

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
        navigate('/product-details', { state: { brand } });
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
        </div>
    );
};

export default ProductBrands;
