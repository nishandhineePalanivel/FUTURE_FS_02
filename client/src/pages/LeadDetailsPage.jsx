import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Building2, Calendar, Clock, Tag, MessageSquare, Plus, Trash2, CalendarDays } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBadge from '../components/StatusBadge';
import { getLeadById, updateLeadStatus, updateLead, addNote, deleteNote } from '../services/leadService';
import { useToast } from '../context/ToastContext';

const STATUSES = ['New', 'Contacted', 'Converted', 'Follow-up', 'Lost'];

const LeadDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusSaving, setStatusSaving] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [noteSaving, setNoteSaving] = useState(false);
  const [followUpDate, setFollowUpDate] = useState('');

  const fetchLead = async () => {
    setLoading(true);
    try {
      const res = await getLeadById(id);
      setLead(res.data);
      if (res.data.followUpDate) {
        setFollowUpDate(new Date(res.data.followUpDate).toISOString().split('T')[0]);
      } else {
        setFollowUpDate('');
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to load lead', 'error');
      navigate('/leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === lead.status) return;
    setStatusSaving(true);
    try {
      const res = await updateLeadStatus(id, newStatus);
      setLead(res.data);
      showToast(`Status changed to ${newStatus}`, 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update status', 'error');
    } finally {
      setStatusSaving(false);
    }
  };

  const handleFollowUpDateChange = async (e) => {
    const newDate = e.target.value;
    setFollowUpDate(newDate);
    try {
      const res = await updateLead(id, { followUpDate: newDate ? newDate : null });
      setLead(res.data);
      showToast('Follow-up date updated', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update follow-up date', 'error');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setNoteSaving(true);
    try {
      const res = await addNote(id, noteText.trim());
      setLead(res.data);
      setNoteText('');
      showToast('Note added successfully', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to add note', 'error');
    } finally {
      setNoteSaving(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const res = await deleteNote(id, noteId);
      setLead(res.data);
      showToast('Note deleted', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to delete note', 'error');
    }
  };

  const formatDateTime = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '—';

  const formatDateOnly = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : 'None scheduled';

  if (loading || !lead) {
    return (
      <AdminLayout>
        <LoadingSpinner fullPage />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <button className="back-link" onClick={() => navigate('/leads')}>
        <ArrowLeft size={16} /> Back to Leads
      </button>

      <div className="details-header">
        <div>
          <h1 className="page-title">{lead.name}</h1>
          <p className="page-subtitle">Lead details and activity</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="status-stepper">
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`step-btn ${lead.status === s ? 'active' : ''}`}
            disabled={statusSaving}
            onClick={() => handleStatusChange(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="details-grid">
        <div className="panel">
          <h3 className="panel-title">Contact Information</h3>
          <div className="info-row">
            <Mail size={16} />
            <div>
              <span className="info-label">Email</span>
              <span className="info-value">{lead.email}</span>
            </div>
          </div>
          <div className="info-row">
            <Phone size={16} />
            <div>
              <span className="info-label">Phone</span>
              <span className="info-value">{lead.phone || 'Not provided'}</span>
            </div>
          </div>
          <div className="info-row">
            <Building2 size={16} />
            <div>
              <span className="info-label">Company</span>
              <span className="info-value">{lead.company || 'Not provided'}</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">Lead Information</h3>
          <div className="info-row">
            <Tag size={16} />
            <div>
              <span className="info-label">Source</span>
              <span className="info-value">{lead.source}</span>
            </div>
          </div>
          <div className="info-row">
            <Calendar size={16} />
            <div>
              <span className="info-label">Created Date</span>
              <span className="info-value">{formatDateTime(lead.createdAt)}</span>
            </div>
          </div>
          <div className="info-row">
            <Clock size={16} />
            <div>
              <span className="info-label">Updated Date</span>
              <span className="info-value">{formatDateTime(lead.updatedAt)}</span>
            </div>
          </div>
          <div className="info-row">
            <CalendarDays size={16} />
            <div style={{ width: '100%' }}>
              <span className="info-label">Follow-up Date</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                <span className="info-value">{formatDateOnly(lead.followUpDate)}</span>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={handleFollowUpDateChange}
                  style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3 className="panel-title">
          <MessageSquare size={16} /> Original Message
        </h3>
        <p className="message-box">{lead.message || 'No message was submitted.'}</p>
      </div>

      <div className="panel">
        <h3 className="panel-title">Follow-up Notes</h3>

        <form className="note-form" onSubmit={handleAddNote}>
          <textarea
            rows={2}
            placeholder="Add a follow-up note, e.g. 'Called the client, interested in premium package...'"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={noteSaving || !noteText.trim()}>
            <Plus size={16} /> {noteSaving ? 'Adding...' : 'Add Note'}
          </button>
        </form>

        {lead.notes.length === 0 ? (
          <p className="empty-note-text">No follow-up notes yet.</p>
        ) : (
          <ul className="notes-list">
            {[...lead.notes]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((note) => (
                <li key={note._id} className="note-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p>{note.text}</p>
                    <span className="note-date">{formatDateTime(note.createdAt)}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    title="Delete note"
                    style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
};

export default LeadDetailsPage;
