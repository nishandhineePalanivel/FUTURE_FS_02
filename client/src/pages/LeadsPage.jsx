import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';
import ConfirmModal from '../components/ConfirmModal';
import EditLeadModal from '../components/EditLeadModal';
import { getLeads, deleteLead } from '../services/leadService';
import { useToast } from '../context/ToastContext';

const STATUS_OPTIONS = ['All', 'New', 'Contacted', 'Converted', 'Follow-up', 'Lost'];
const SOURCE_OPTIONS = ['All', 'Website', 'LinkedIn', 'Referral', 'Instagram', 'Other'];

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [source, setSource] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLeads({ search, status, source, page, limit: 8 });
      setLeads(res.data);
      setTotalPages(res.totalPages);
      setTotal(res.total);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to load leads', 'error');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status, source, page]);

  useEffect(() => {
    const timeout = setTimeout(fetchLeads, 300); // debounce search input
    return () => clearTimeout(timeout);
  }, [fetchLeads]);

  useEffect(() => {
    setPage(1);
  }, [search, status, source]);

  const handleDelete = async () => {
    try {
      await deleteLead(deleteTarget._id);
      showToast('Lead deleted successfully', 'success');
      setDeleteTarget(null);
      fetchLeads();
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to delete lead', 'error');
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <AdminLayout>
      <Header title="Leads" subtitle={`${total} total lead${total === 1 ? '' : 's'}`} />

      <div className="toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            placeholder="Search by name, email, company or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All Statuses' : s}
            </option>
          ))}
        </select>

        <select value={source} onChange={(e) => setSource(e.target.value)}>
          {SOURCE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All Sources' : s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <LoadingSpinner fullPage />
      ) : leads.length === 0 ? (
        <EmptyState
          title="No leads found"
          message="Try adjusting your search or filters, or wait for new inquiries to come in."
        />
      ) : (
        <>
          <div className="table-wrap">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id}>
                    <td data-label="Name">{lead.name}</td>
                    <td data-label="Email">{lead.email}</td>
                    <td data-label="Phone">{lead.phone || '—'}</td>
                    <td data-label="Company">{lead.company || '—'}</td>
                    <td data-label="Source">{lead.source}</td>
                    <td data-label="Status">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td data-label="Created">{formatDate(lead.createdAt)}</td>
                    <td data-label="Actions">
                      <div className="row-actions">
                        <button title="View" onClick={() => navigate(`/leads/${lead._id}`)}>
                          <Eye size={16} />
                        </button>
                        <button title="Edit" onClick={() => setEditTarget(lead)}>
                          <Pencil size={16} />
                        </button>
                        <button title="Delete" className="danger" onClick={() => setDeleteTarget(lead)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft size={16} /> Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete this lead?"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <EditLeadModal
        lead={editTarget}
        onClose={() => setEditTarget(null)}
        onSaved={() => {
          setEditTarget(null);
          fetchLeads();
        }}
      />
    </AdminLayout>
  );
};

export default LeadsPage;
