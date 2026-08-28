// Centralized error handler. Keeps error responses consistent and
// never leaks stack traces or internal details to the client.
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join('. ') });
  }

  // Mongoose invalid ObjectId (e.g. bad :id in URL)
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  // Duplicate key error (e.g. unique email on Admin)
  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'Duplicate value entered' });
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Something went wrong on the server' : err.message;

  res.status(statusCode).json({ success: false, message });
};

// Wraps a 404 for unmatched routes
const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

module.exports = { errorHandler, notFound };
