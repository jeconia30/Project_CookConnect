import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Halaman yang sudah di-migrasi
import LandingPage from './pages/LandingPage.jsx';
import Profile from './pages/Profile.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';

// Asumsi: Halaman ini akan segera dibuat dari file login.html
const LoginPage = () => <div>Halaman Login (Belum dibuat)</div>; 
// Asumsi: Halaman ini akan segera dibuat dari file feed.html
const FeedPage = () => <div>Halaman Feed (Belum dibuat)</div>; 
// Asumsi: Halaman ini akan segera dibuat dari file recipe-detail.html
const RecipeDetail = () => <div>Halaman Detail Resep (Belum dibuat)</div>; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Halaman Depan (index.html) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rute Halaman Autentikasi (login.html, forgot-password.html, setup-profile.html) */}
        {/* Kita menggunakan satu komponen Login/Auth untuk menangani semua flow ini nanti */}
        <Route path="/login" element={<LoginPage />} /> 

        {/* Rute Halaman Utama Setelah Login (feed.html) */}
        <Route path="/feed" element={<FeedPage />} /> 
        
        {/* Rute Halaman Buat Resep (create-recipe.html) */}
        <Route path="/create" element={<CreateRecipe />} />
        
        {/* Rute Halaman Profil Pribadi (my-profile.html) */}
        {/* Menggunakan prop isCurrentUser={true} pada komponen Profile */}
        <Route path="/profile/me" element={<Profile isCurrentUser={true} />} />
        
        {/* Rute Halaman Profil Orang Lain (profile.html) */}
        <Route path="/profile/:username" element={<Profile isCurrentUser={false} />} />
        
        {/* Rute Halaman Detail Resep (recipe-detail.html) */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        
        {/* Rute Catch-all untuk 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;