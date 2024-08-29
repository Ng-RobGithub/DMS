const errorHandler = (err, req, res, next) => {
  // Log error stack trace in development
  if (process.env.NODE_ENV === 'development') {
      console.error(err.stack || err.message);
  } else {
      console.error(err.message); // Log only the message in production
  }

  // Default to 500 if the error does not have a status code
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';

  res.status(statusCode).json({
      success: false,
      error: message
  });
};

module.exports = errorHandler;
