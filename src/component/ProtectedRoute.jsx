// src/component/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or use context/auth hook

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;