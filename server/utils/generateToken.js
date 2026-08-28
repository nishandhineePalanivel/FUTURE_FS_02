const jwt = require('jsonwebtoken');

// Signs a JWT that expires in 7 days, carrying the admin's id and email
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;
