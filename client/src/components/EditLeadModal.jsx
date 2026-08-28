import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { updateLead } from '../services/leadService';
import { useToast } from '../context/ToastContext';

const SOURCES = ['Website', 'LinkedIn', 'Referral', 'Instagram', 'Other'];
const STATUSES = ['New', 'Contacted', 'Converted', 'Follow-up', 'Lost'];

// Modal used to edit an existing lead's core details from the Leads table.
const EditLeadModal = ({ lead, onClose, onSaved }) => {
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        message: lead.message || '',
        source: lead.source || 'Website',
        status: lead.status || 'New',
        followUpDate: lead.followUpDate ? new Date(lead.followUpDate).toISOString().split('T')[0] : '',
      });
      setErrors({});
    }
  }, [lead]);

  if (!lead || !form) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      await updateLead(lead._id, form);
      showToast('Lead updated successfully', 'success');
      onSaved();
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update lead', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box modal-form" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <h3 className="modal-title">Edit Lead</h3>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} className={errors.name ? 'input-error' : ''} />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input name="email" value={form.email} onChange={handleChange} className={errors.email ? 'input-error' : ''} />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input name="company" value={form.company} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Source</label>
              <select name="source" value={form.source} onChange={handleChange}>
                {SOURCES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Follow-up Date</label>
            <input type="date" name="followUpDate" value={form.followUpDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea name="message" rows={3} value={form.message} onChange={handleChange} />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeadModal;
