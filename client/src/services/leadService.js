import api from './api';

// Public — used by the contact form (no auth token required)
export const submitLead = async (leadData) => {
  const { data } = await api.post('/leads', leadData);
  return data;
};

// Admin — protected endpoints
export const getLeads = async (params = {}) => {
  const { data } = await api.get('/leads', { params });
  return data;
};

export const getLeadById = async (id) => {
  const { data } = await api.get(`/leads/${id}`);
  return data;
};

export const updateLead = async (id, updates) => {
  const { data } = await api.put(`/leads/${id}`, updates);
  return data;
};

export const deleteLead = async (id) => {
  const { data } = await api.delete(`/leads/${id}`);
  return data;
};

export const updateLeadStatus = async (id, status) => {
  const { data } = await api.patch(`/leads/${id}/status`, { status });
  return data;
};

export const addNote = async (id, text) => {
  const { data } = await api.post(`/leads/${id}/notes`, { text });
  return data;
};

export const getAnalytics = async () => {
  const { data } = await api.get('/leads/analytics/summary');
  return data;
};
