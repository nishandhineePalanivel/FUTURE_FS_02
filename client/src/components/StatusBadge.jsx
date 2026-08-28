import React from 'react';

const STATUS_CLASSES = {
  New: 'badge badge-new',
  Contacted: 'badge badge-contacted',
  Converted: 'badge badge-converted',
  'Follow-up': 'badge badge-followup',
  Lost: 'badge badge-lost',
};

const StatusBadge = ({ status }) => {
  return <span className={STATUS_CLASSES[status] || 'badge'}>{status}</span>;
};

export default StatusBadge;
