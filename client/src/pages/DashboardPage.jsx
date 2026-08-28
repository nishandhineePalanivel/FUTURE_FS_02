import React, { useEffect, useState } from 'react';
import { Users, Sparkles, PhoneCall, Trophy, TrendingUp } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusChart from '../components/StatusChart';
import { getAnalytics } from '../services/leadService';
import { useToast } from '../context/ToastContext';

const DashboardPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await getAnalytics();
      setAnalytics(res.data);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to load analytics', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const cards = analytics
    ? [
        { label: 'Total Leads', value: analytics.total, icon: <Users size={20} />, className: 'card-total' },
        { label: 'New Leads', value: analytics.new, icon: <Sparkles size={20} />, className: 'card-new' },
        { label: 'Contacted', value: analytics.contacted, icon: <PhoneCall size={20} />, className: 'card-contacted' },
        { label: 'Converted', value: analytics.converted, icon: <Trophy size={20} />, className: 'card-converted' },
        { label: 'Conversion Rate', value: `${analytics.conversionRate}%`, icon: <TrendingUp size={20} />, className: 'card-rate' },
      ]
    : [];

  return (
    <AdminLayout>
      <Header title="Dashboard" subtitle="Overview of your leads and performance" />

      {loading ? (
        <LoadingSpinner fullPage />
      ) : (
        <>
          <div className="stats-grid">
            {cards.map((card) => (
              <div className={`stat-card ${card.className}`} key={card.label}>
                <div className="stat-icon">{card.icon}</div>
                <div>
                  <p className="stat-label">{card.label}</p>
                  <p className="stat-value">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="panel">
            <h3 className="panel-title">Leads by Status</h3>
            <StatusChart data={analytics} />
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default DashboardPage;
