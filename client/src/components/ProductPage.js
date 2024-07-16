import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart([...cart, { ...product, quantity: 1 }]);
        setMessage('Order Successfully added to cart');
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

    const proceedToCheckout = () => {
        // Logic for proceeding to checkout
    };

    return (
        <div>
            <h1>Products</h1>
            <div>
                {products.map((product, index) => (
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
                <button onClick={proceedToCheckout}>Proceed</button>
            </div>
        </div>
    );
};

export default ProductPage;
