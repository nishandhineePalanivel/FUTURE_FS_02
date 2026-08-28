import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Mail, LogOut, Boxes } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Sidebar = () => {
  const { logout, admin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Boxes size={22} />
        <span>Mini CRM</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/leads" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Users size={18} />
          <span>Leads</span>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Mail size={18} />
          <span>Contact Form</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-admin">
          <div className="avatar">{admin?.email?.[0]?.toUpperCase() || 'A'}</div>
          <span className="sidebar-admin-email">{admin?.email}</span>
        </div>
        <button className="sidebar-link logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
