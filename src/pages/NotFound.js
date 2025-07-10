import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="home-button">Return Home</Link>
    </div>
  );
};

export default NotFound;
