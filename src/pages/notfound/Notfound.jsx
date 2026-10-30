import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Notfound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-error-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-message">
          Oops! The page you are looking for doesn't exist, has been removed, 
          or is temporarily unavailable.
        </p>
        <div className="not-found-button-container">
          <button onClick={() => navigate(-1)} className="not-found-btn-secondary">
            &larr; Go Back
          </button>
          <Link to="/" className="not-found-btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;