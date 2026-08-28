import React from 'react';

// Simple, dependency-free horizontal bar chart built with plain CSS.
// Avoids pulling in a heavy charting library for one chart.
const StatusChart = ({ data }) => {
  const { new: newCount = 0, contacted = 0, converted = 0 } = data || {};
  const max = Math.max(newCount, contacted, converted, 1);

  const rows = [
    { label: 'New', value: newCount, className: 'bar-new' },
    { label: 'Contacted', value: contacted, className: 'bar-contacted' },
    { label: 'Converted', value: converted, className: 'bar-converted' },
  ];

  return (
    <div className="status-chart">
      {rows.map((row) => (
        <div className="status-chart-row" key={row.label}>
          <span className="status-chart-label">{row.label}</span>
          <div className="status-chart-track">
            <div
              className={`status-chart-bar ${row.className}`}
              style={{ width: `${(row.value / max) * 100}%` }}
            />
          </div>
          <span className="status-chart-value">{row.value}</span>
        </div>
      ))}
    </div>
  );
};

export default StatusChart;
