const { default: axios } = require('axios');

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
};

const api = axios.create({
  baseURL: 'https://api.paystack.co/transaction',
  timeout: 1000,
  headers,
});

module.exports = api;
