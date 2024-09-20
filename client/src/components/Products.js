import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/NgRob.png'; // Ensure this path is correct
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
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

  const handleDeliveryMethodChange = (event) => {
    const method = event.target.value;
    setDeliveryMethod(method);
    if (method) {
      navigate('/delivery-method', { state: { deliveryMethod: method } });
    }
  };

  const handleOrderNow = (product) => {
    navigate('/order', { state: { product } });
  };

  return (
    <div className="products-container">
      <header className="header">
        <img src={logo} alt="Company Logo" className="logo" />
      </header>
      <h1>Business Unit</h1>
      <label>
        <select value={deliveryMethod} onChange={handleDeliveryMethodChange}>
          <option value="">Choose BU</option>
          <option value="Cement">Cement</option>
          <option value="Sugar">Sugar</option>
          <option value="Oil & Gas">Oil & Gas</option>
          <option value="Fertilizer">Fertilizer</option>
        </select>
      </label>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <button onClick={() => handleOrderNow(product)}>Order Now</button>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
};

export default Products;
