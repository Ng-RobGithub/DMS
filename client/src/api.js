// api.js

import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Ensure correct API URL
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')?.trim();
    
    // Only log in development mode to avoid exposing token in production
    if (process.env.NODE_ENV === 'development') {
      console.log('Token being sent:', token);
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthorized errors
api.interceptors.response.use(
  (response) => response, // Return the response if no errors
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access - remove token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
