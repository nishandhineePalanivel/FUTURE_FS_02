const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true, // stored as a bcrypt hash, never plain text
    },
    name: {
      type: String,
      default: 'Admin',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
