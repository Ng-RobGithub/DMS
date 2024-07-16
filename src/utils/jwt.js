const jwt = require('jsonwebtoken');
const config = require('../config/default');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken,
};
