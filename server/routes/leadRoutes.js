const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  addNote,
  getAnalytics,
} = require('../controllers/leadController');

// Public route — the contact form posts here without a token
router.post('/', createLead);

// Everything below requires a valid admin JWT
router.get('/analytics/summary', protect, getAnalytics);
router.get('/', protect, getLeads);
router.get('/:id', protect, getLeadById);
router.put('/:id', protect, updateLead);
router.delete('/:id', protect, deleteLead);
router.patch('/:id/status', protect, updateLeadStatus);
router.post('/:id/notes', protect, addNote);

module.exports = router;
