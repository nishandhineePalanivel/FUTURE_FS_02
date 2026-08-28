/**
 * One-time script to create the first admin account.
 * Run with: npm run create-admin
 *
 * Reads ADMIN_EMAIL and ADMIN_PASSWORD from .env, hashes the password
 * with bcrypt, and stores the admin in MongoDB. The plain password is
 * never saved anywhere.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const run = async () => {
  const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!MONGO_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('❌ MONGO_URI, ADMIN_EMAIL and ADMIN_PASSWORD must be set in server/.env');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (existing) {
      console.log('ℹ️  An admin with this email already exists. No changes made.');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    const admin = await Admin.create({
      email: ADMIN_EMAIL.toLowerCase(),
      password: hashedPassword,
      name: 'Admin',
    });

    console.log(`✅ Admin account created successfully for ${admin.email}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create admin:', error.message);
    process.exit(1);
  }
};

run();
