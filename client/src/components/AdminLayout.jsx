import React from 'react';
import Sidebar from './Sidebar';

// Shared shell for every authenticated admin page: sidebar + content area
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
