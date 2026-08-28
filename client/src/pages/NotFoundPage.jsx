import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <Compass size={40} />
        <h1 className="auth-title">404 — Page Not Found</h1>
        <p className="auth-subtitle">The page you're looking for doesn't exist.</p>
        <Link to="/contact" className="btn btn-primary btn-block">
          Go to Contact Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
