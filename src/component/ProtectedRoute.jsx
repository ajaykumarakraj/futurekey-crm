import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get authenticated user from context

  // If no user is authenticated, redirect to sign-in
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
