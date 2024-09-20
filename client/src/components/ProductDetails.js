// client/src/components/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { productDetails } from '../data/ProductMaps';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductDetails.css'; // Import CSS for styling
import logo from '../assets/NgRob.png'; // Import the company logo

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
            const cartItem = { brand, quantity, price: product.pricePerBag };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            setMessage('Order Successfully added to cart');
            setIsOrderAdded(true);
        } catch (error) {
            console.error('Error adding to cart:', error);
            setMessage('Order cannot be added to cart, kindly contact your sales officer');
            setIsOrderAdded(false);
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    const { description, pricePerBag } = product;
    const totalPrice = pricePerBag * quantity;

    return (
        <div className="product-details-container">
            <div className="header">
                <img src={logo} alt="Company Logo" className="company-logo" /> {/* Company logo */}
                <div className="cart-icon-container">
                    <FaShoppingCart 
                        className="cart-icon" 
                        onClick={() => navigate('/cart')} // Navigate to cart on click
                    />
                    {isOrderAdded && <div className="notification-dot" onClick={() => navigate('/cart')}></div>}
                </div>
            </div>
            <h1>Product Details</h1>
            <h2>{brand}</h2>
            <p>{description}</p>
            <p>Price per bag: NGN {pricePerBag}</p>
            <div className="quantity-control">
                <button className="quantity-btn" onClick={() => handleQuantityChange(-300)}>-</button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-btn" onClick={() => handleQuantityChange(300)}>+</button>
            </div>
            <p>Total Price: NGN {totalPrice}</p>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            {message && <p className="message">{message}</p>}
            <div className="action-buttons">
                <button className="back-btn" onClick={() => navigate(-1)}>&lt;&lt; Back</button>
                <button className="cancel-btn" onClick={() => navigate('/')}>Cancel</button>
            </div>
        </div>
    );
};

export default ProductDetails;
