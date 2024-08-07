import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api'  // Adjust this URL to your backend's base URL
});

export default api;
