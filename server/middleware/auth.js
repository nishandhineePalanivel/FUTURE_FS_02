const jwt = require('jsonwebtoken');

// Protects routes by requiring a valid JWT in the Authorization header.
// Expected header format: "Authorization: Bearer <token>"
const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // { id, email }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized. Invalid or expired token.' });
  }
};

module.exports = protect;
