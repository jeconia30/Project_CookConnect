import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './styles/app.css';

import Layout from './components/Layout'; 
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
import ProfilePage from './pages/ProfilePage.jsx';
import TermsPrivacy from './pages/TermsPrivacy.jsx'; 

const ScrollToHash = () => {
  const location = useLocation();
  React.useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash /> 
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/setup-profile" element={<SetupProfile />} />
        
        <Route path="/terms-privacy" element={<TermsPrivacy />} /> 
        <Route path="/terms" element={<TermsPrivacy />} /> 
        <Route path="/privacy" element={<TermsPrivacy />} /> 
        
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/create" element={
                <div style={{ flexGrow: 1, maxWidth: '100%' }}> 
                    <CreateRecipe /> 
                </div>
            } />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/profile/me" element={<ProfilePage isCurrentUser={true} />} />
            <Route path="/profile/:username" element={<ProfilePage isCurrentUser={false} />} />
        </Route>
        
        <Route path="*" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Halaman Tidak Ditemukan</h1>
            <a href="/feed" style={{ color: '#38761d', fontWeight: 'bold' }}>Kembali ke Feed</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;