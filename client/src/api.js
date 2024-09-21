import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL:'http://localhost:5000/api' // Adjust this URL to your backend's base URL
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  config => {
    const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY3.fGcYxJ0k_gSnghZdWEDq5riL1Exgy8-iT-8_xdvr73U';
   
    // const token = localStorage.getItem('token')?.trim();
   console.log('Using hardcoded token:', hardcodedToken);
    // if (token) {
      if (hardcodedToken.split('.').length === 3) {
      config.headers.Authorization = `Bearer ${hardcodedToken}`;
      }else {
        console.error('Invalid JWT format');
      }
    // }
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
