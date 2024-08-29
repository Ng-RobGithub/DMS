// client/src/components/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { productDetails } from '../data/ProductMaps';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductDetails.css'; // Import CSS for styling

const ProductDetails = () => {
    const { state } = useLocation();
    const { brand } = state || {};
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(300);
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState('');
    const [isOrderAdded, setIsOrderAdded] = useState(false); // State to track if order was added

    useEffect(() => {
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
        setQuantity(prevQuantity => Math.max(prevQuantity + amount, 300));
    };

    const handleAddToCart = () => {
        try {
            // Example of adding to cart - replace with actual logic
            const cartItem = { brand, quantity, price: product.pricePerBag };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            setMessage('Order Successfully added to cart');
            setIsOrderAdded(true); // Show the red dot
        } catch (error) {
            console.error('Error adding to cart:', error);
            setMessage('Order cannot be added to cart, kindly contact your sales officer');
            setIsOrderAdded(false); // Hide the red dot if there's an error
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    const { description, pricePerBag } = product;
    const totalPrice = pricePerBag * quantity;

    return (
        <div>
            <div className="cart-icon-container">
                <FaShoppingCart 
                    className="cart-icon" 
                    onClick={() => navigate('/cart')} // Navigate to cart on click
                />
                {isOrderAdded && <div className="notification-dot" onClick={() => navigate('/cart')}></div>} {/* Red dot */}
            </div>
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
            {message && <p>{message}</p>}
            <div>
                <button onClick={() => navigate(-1)}>&lt;&lt; Back</button>
                <button onClick={() => navigate('/')}>Cancel</button>
            </div>
        </div>
    );
};

export default ProductDetails;
