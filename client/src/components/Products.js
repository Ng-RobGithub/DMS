// client/src/components/Products.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error('API response is not an array:', response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart([...cart, { ...product, quantity: 1 }]);
        setMessage('Order successfully added to cart');
    };

    const increaseQuantity = (index) => {
        const newCart = [...cart];
        newCart[index].quantity += 1;
        setCart(newCart);
    };

    const decreaseQuantity = (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCart(newCart);
        }
    };

    const handleDeliveryMethodChange = (event) => {
        const method = event.target.value;
        setDeliveryMethod(method);
        if (method) {
            navigate('/delivery-method', { state: { deliveryMethod: method } });
        }
    };

    return (
        <div>
            <h1>Products</h1>
            <label>
                Select Delivery Method:
                <select value={deliveryMethod} onChange={handleDeliveryMethodChange}>
                    <option value="">Select a method</option>
                    <option value="Plant/Direct Delivery by NG-ROB">Plant/Direct Delivery by NG-ROB</option>
                    <option value="Self-Collection by Customer">Self-Collection by Customer</option>
                    <option value="CTES/CTES Plus">CTES/CTES Plus</option>
                </select>
            </label>
            <div>
                {products.map((product) => (
                    <div key={product._id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <div>
                <h1>Cart</h1>
                {message && <p>{message}</p>}
                {cart.map((item, index) => (
                    <div key={index}>
                        <h2>{item.name}</h2>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => decreaseQuantity(index)}>-</button>
                        <button onClick={() => increaseQuantity(index)}>+</button>
                    </div>
                ))}
                <button onClick={() => navigate('/delivery-details', { state: { deliveryMethod } })}>Proceed</button>
                <button onClick={() => navigate('/')}>&lt;&lt; Back</button>
                <button onClick={() => navigate('/')} >Cancel</button>
            </div>
        </div>
    );
};

export default Products;
