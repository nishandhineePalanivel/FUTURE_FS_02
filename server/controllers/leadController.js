const Lead = require('../models/Lead');

// @route   POST /api/leads
// @access  Public (this is the endpoint the public contact form submits to)
const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, company, message, source } = req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      message,
      source: source || 'Website',
      status: 'New',
    });

    res.status(201).json({ success: true, message: 'Lead submitted successfully', data: lead });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/leads?search=&status=&source=&page=&limit=
// @access  Private
const getLeads = async (req, res, next) => {
  try {
    const { search, status, source, page = 1, limit = 10 } = req.query;

    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (source && source !== 'All') {
      query.source = source;
    }

    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ name: regex }, { email: regex }, { company: regex }, { phone: regex }];
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Lead.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: leads.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/leads/:id
// @access  Private
const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/leads/:id
// @access  Private
const updateLead = async (req, res, next) => {
  try {
    const { name, email, phone, company, message, source, status } = req.body;

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    if (name !== undefined) lead.name = name;
    if (email !== undefined) lead.email = email;
    if (phone !== undefined) lead.phone = phone;
    if (company !== undefined) lead.company = company;
    if (message !== undefined) lead.message = message;
    if (source !== undefined) lead.source = source;
    if (status !== undefined) lead.status = status;

    await lead.save();

    res.status(200).json({ success: true, message: 'Lead updated successfully', data: lead });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    await lead.deleteOne();
    res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @route   PATCH /api/leads/:id/status
// @access  Private
const updateLeadStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'Contacted', 'Converted'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    lead.status = status;

    // Automatically stamp lastContactedAt when moving to Contacted
    if (status === 'Contacted') {
      lead.lastContactedAt = new Date();
    }

    await lead.save();

    res.status(200).json({ success: true, message: `Status updated to ${status}`, data: lead });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/leads/:id/notes
// @access  Private
const addNote = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Note text is required' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    lead.notes.push({ text: text.trim(), createdAt: new Date() });
    await lead.save();

    res.status(201).json({ success: true, message: 'Note added successfully', data: lead });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/leads/analytics/summary
// @access  Private
const getAnalytics = async (req, res, next) => {
  try {
    const [total, newCount, contacted, converted] = await Promise.all([
      Lead.countDocuments({}),
      Lead.countDocuments({ status: 'New' }),
      Lead.countDocuments({ status: 'Contacted' }),
      Lead.countDocuments({ status: 'Converted' }),
    ]);

    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : '0.0';

    res.status(200).json({
      success: true,
      data: {
        total,
        new: newCount,
        contacted,
        converted,
        conversionRate: Number(conversionRate),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  addNote,
  getAnalytics,
};
