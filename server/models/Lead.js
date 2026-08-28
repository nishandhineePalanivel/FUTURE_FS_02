const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Note text is required'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
      default: '',
    },
    source: {
      type: String,
      enum: ['Website', 'LinkedIn', 'Referral', 'Instagram', 'Other'],
      default: 'Website',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Converted', 'Follow-up', 'Lost'],
      default: 'New',
    },
    notes: [noteSchema],
    followUpDate: {
      type: Date,
      default: null,
    },
    lastContactedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Index to speed up text-based search across common fields
leadSchema.index({ name: 'text', email: 'text', company: 'text', phone: 'text' });

module.exports = mongoose.model('Lead', leadSchema);
