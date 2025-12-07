import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import api from './api/axiosInstance';
import './styles/app.css';

// Import Components
import Layout from './components/Layout'; // BARU
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import SetupProfile from './pages/SetupProfile.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import FeedPage from './pages/FeedPage.jsx'; 
import CreateRecipe from './pages/CreateRecipe.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import ProfilePage from './pages/ProfilePage.jsx'; // KONSOLIDASI

// --- KOMPONEN UX: SMOOTH SCROLL TO HASH ---
const ScrollToHash = () => {
  const location = useLocation();
  React.useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Smooth scroll ke elemen dengan ID yang cocok
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
        // Gulir ke atas halaman saat pindah route non-hash
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
};
// --- END SMOOTH SCROLL ---


function App() {
  return (
    <BrowserRouter>
      <ScrollToHash /> 
      
      <Routes>
        {/* === PUBLIC ROUTES (No Layout) === */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/setup-profile" element={<SetupProfile />} />
        
        {/* === PROTECTED ROUTES (Menggunakan ProtectedRoute) === */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
             
            <Route path="/feed" element={<FeedPage />} />

            <Route path="/notifications" element={<NotificationPage />} />
            
            {/* Create Recipe dibungkus di div agar mengambil seluruh lebar di dalam Layout */}
            <Route path="/create" element={
                <div style={{ flexGrow: 1, maxWidth: '100%' }}> 
                    <CreateRecipe /> 
                </div>
            } />
            
            {/* Detail Resep */}
            <Route path="/recipe/:id" element={<RecipeDetail />} />

            {/* ROUTE PROFIL KONSOLIDASI */}
            {/* Profil Sendiri (isCurrentUser=true) */}
            <Route path="/profile/me" element={<ProfilePage isCurrentUser={true} />} />
            
            {/* Profil Orang Lain (isCurrentUser=false) */}
            <Route path="/profile/:username" element={<ProfilePage isCurrentUser={false} />} />
            
        </Route>
        
        {/* Route Catch-all (404) */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Halaman Tidak Ditemukan</h1>
            <p>Sepertinya kamu tersesat di dapur.</p>
            <a href="/feed" style={{ color: '#38761d', fontWeight: 'bold' }}>Kembali ke Feed</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;