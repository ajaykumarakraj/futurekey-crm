import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check both storages for auth token
  const token =
    localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    // Not logged in, redirect to sign-in page
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
