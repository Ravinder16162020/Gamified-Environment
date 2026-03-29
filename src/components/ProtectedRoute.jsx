import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Role-based route protection
const ProtectedRoute = ({ children, allowedRole }) => {
  const location = useLocation();
  const userRole = localStorage.getItem('userRole');

  if (!userRole) {
    // Not logged in, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole !== allowedRole) {
    // Wrong role, redirect to appropriate dashboard
    if (userRole === 'ecosprint') {
      return <Navigate to="/dashboard" replace />;
    } else if (userRole === 'codesprint') {
      return <Navigate to="/journey" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
