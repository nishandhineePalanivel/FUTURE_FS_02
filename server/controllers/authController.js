const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(admin);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/auth/me
// @access  Private — used by the frontend to verify a stored token is still valid
const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, admin });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe };
