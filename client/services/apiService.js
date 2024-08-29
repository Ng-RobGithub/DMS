// src/services/apiService.js

const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
