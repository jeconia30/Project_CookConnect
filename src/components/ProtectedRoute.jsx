// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// --- GANTI SELURUH ISI FILE INI UNTUK BYPASS SEMENTARA ---

const ProtectedRoute = ({ children }) => {
  // OPSI 1: BYPASS TOTAL UNTUK TESTING
  // Kembalikan anak komponen secara langsung, abaikan pengecekan token.
  // HANYA UNTUK DEVELOPMENT!
  return children ? children : <Outlet />;
  
  /* // OPSI 2: KODE ASLI (JIKA INGIN KEMBALI MENGGUNAKAN LOGIKA PENCEKALAN)
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    console.log("Redirecting to login: No token found.");
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
  */
};

export default ProtectedRoute;