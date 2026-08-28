import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ title = 'No data found', message, icon }) => {
  return (
    <div className="empty-state">
      {icon || <Inbox size={40} strokeWidth={1.5} />}
      <h3>{title}</h3>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmptyState;
