import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');

  // Jika tidak ada token, redirect ke login
  if (!authToken) {
    console.warn('⚠️ No auth token found. Redirecting to login...');
    return <Navigate to="/login" replace />;
  }

  // Jika ada token, tampilkan children atau outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;