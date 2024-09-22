import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' // Adjust this URL to your backend's base URL
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')?.trim();
    console.log('Token being sent:', token); // Get the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthorized errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
