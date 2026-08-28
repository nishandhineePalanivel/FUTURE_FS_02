import React from 'react';

const LoadingSpinner = ({ fullPage = false, size = 32 }) => {
  const spinner = (
    <div className="spinner" style={{ width: size, height: size }} aria-label="Loading" />
  );

  if (fullPage) {
    return <div className="spinner-fullpage">{spinner}</div>;
  }

  return spinner;
};

export default LoadingSpinner;
