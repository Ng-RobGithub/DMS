// src/config/redis.js
const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

// Handle connection events
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
redisClient.connect();

// Export the Redis client for use in other parts of the application
module.exports = redisClient;
