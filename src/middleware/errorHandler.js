const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message);

  // Default to 500 if the error does not have a status code
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';

  res.status(statusCode).json({
      success: false,
      error: message
  });
};

module.exports = errorHandler;
