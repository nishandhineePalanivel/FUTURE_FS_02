import React, { useState } from 'react';
import { Boxes, User, Mail, Phone, Building2, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { submitLead } from '../services/leadService';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  source: 'Website',
};

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!validate()) return;

    setLoading(true);
    try {
      await submitLead(form);
      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Something went wrong. Please try again in a moment.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="auth-brand">
          <Boxes size={28} />
          <span>Mini CRM</span>
        </div>

        <h1 className="auth-title">Get in Touch</h1>
        <p className="auth-subtitle">
          Tell us a bit about your business and we'll get back to you shortly.
        </p>

        {submitted ? (
          <div className="success-box">
            <CheckCircle2 size={40} />
            <h3>Thank you! Your inquiry has been submitted successfully.</h3>
            <p>Our team will review your message and reach out soon.</p>
            <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <div className="input-with-icon">
                <User size={16} />
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className={errors.name ? 'input-error' : ''}
                />
              </div>
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <div className="input-with-icon">
                  <Mail size={16} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={errors.email ? 'input-error' : ''}
                  />
                </div>
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <div className="input-with-icon">
                  <Phone size={16} />
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 555 000 0000"
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <div className="input-with-icon">
                  <Building2 size={16} />
                  <input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="source">How did you hear about us?</label>
                <select id="source" name="source" value={form.source} onChange={handleChange}>
                  <option value="Website">Website</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Referral">Referral</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <div className="input-with-icon textarea-wrap">
                <MessageSquare size={16} />
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or requirement..."
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Submitting...' : (
                <>
                  <Send size={16} /> Submit Inquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
