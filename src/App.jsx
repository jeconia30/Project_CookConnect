import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';

import LandingPage from './pages/LandingPage.jsx';
import Profile from './pages/Profile.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword';
import MyProfile from './pages/My-profile.jsx';
import RecipeDetail from "./pages/RecipeDetail";

import FeedPage from './pages/FeedPage.jsx'; 
import SetupProfile from './pages/SetupProfile.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Halaman Depan (index.html) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rute Halaman Autentikasi (login.html, forgot-password.html, setup-profile.html) */}
        <Route path="/login" element={<AuthPage />} /> 

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/setup-profile" element={<SetupProfile />} />
        
        {/* Rute Halaman Utama Setelah Login (feed.html) */}
        <Route path="/feed" element={<FeedPage />} />
        
        {/* Rute Halaman Buat Resep (create-recipe.html) */}
        <Route path="/create" element={<CreateRecipe />} />
        
        {/* Rute Halaman Profil Pribadi (my-profile.html) */}
        <Route path="/profile/me" element={<Profile isCurrentUser={true} />} />
        
        {/* Rute Halaman Profil Orang Lain (profile.html) */}
        <Route path="/profile/:username" element={<Profile isCurrentUser={false} />} />
        
        {/* Rute Halaman Detail Resep (recipe-detail.html) */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />

        {/* ➤ RUTE BARU UNTUK my-profile.jsx */}
        <Route path="/my-profile" element={<MyProfile />} />

        <Route path="/detail-resep" element={<RecipeDetail />} />

        
        {/* Rute Catch-all untuk 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
