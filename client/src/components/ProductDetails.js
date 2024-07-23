// client/src/components/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productDetails } from '../Data/ProductMaps'; // Import the product details

const ProductDetails = () => {
    const { state } = useLocation();
    const { brand } = state || {};

    const [quantity, setQuantity] = useState(300);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch the product details based on the brand
        if (brand) {
            const details = productDetails[brand];
            if (details) {
                setProduct(details);
            } else {
                console.error('Product details not found for:', brand);
            }
        }
    }, [brand]);

    const handleQuantityChange = (amount) => {
        setQuantity(prevQuantity => Math.max(prevQuantity + amount, 300)); // Ensure quantity is at least 1
    };

    const handleAddToCart = () => {
        // Logic to add the product to the cart
        console.log('Added to cart:', { brand, quantity });
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    const { description, pricePerBag } = product;
    const totalPrice = pricePerBag * quantity;

    return (
        <div>
            <h1>Product Details</h1>
            <h2>{brand}</h2>
            <p>{description}</p>
            <p>Price per bag: NGN {pricePerBag}</p>
            <div>
                <button onClick={() => handleQuantityChange(-300)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(300)}>+</button>
            </div>
            <p>Total Price: NGN {totalPrice}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;
