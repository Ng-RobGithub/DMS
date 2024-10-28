// client/src/components/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { productDetails } from '../data/ProductMaps';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductDetails.css';
import logo from '../assets/NgRob.png';
import api from '../api';

const ProductDetails = () => {
    const { state } = useLocation();
    const { brand } = state || {};
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(300);
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState('');
    const [isOrderAdded, setIsOrderAdded] = useState(false);

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

    const handleAddToCart = async () => {
        try {
            const cartItem = {
                productId: product.id, // Assuming each product has an id
                quantity,
                price: product.pricePerBag,
            };

            // Send cart item to backend
            const response = await api.post('/cart', cartItem);

            if (response.status === 200) {
                setMessage('Order successfully added to cart');
                setIsOrderAdded(true);
            }
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
                <img src={logo} alt="Company Logo" className="company-logo" />
                <div className="cart-icon-container">
                    <FaShoppingCart 
                        className="cart-icon" 
                        onClick={() => navigate('/cart')}
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
