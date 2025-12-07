import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link & useNavigate
import "../styles/components/Navbar.css";

const NavbarLoggedin = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); 
  const authToken = localStorage.getItem('authToken');
  // Ambil data profil dari LocalStorage untuk gambar/username
  const userProfileData = JSON.parse(localStorage.getItem('userProfileData') || '{}'); 
  const profilePhoto = userProfileData.photo || null;
  const username = userProfileData.username || "guest";

  // Fungsi untuk menangani pencarian
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedKeyword = keyword.trim();
      
      // Navigasi ke halaman feed dengan query parameter
      navigate(`/feed?q=${trimmedKeyword}`); 
    }
  };

  return (
    <header className="main-header">
      <nav className="navbar container">
        {/* 1. LOGO */}
        <Link to="/feed" className="logo-link">
          <div className="logo">CookConnect</div>
        </Link>

        {/* 2. SEARCH BAR (Kini Memicu Navigasi) */}
        <div className="search-container">
          <i className="fas fa-search search-icon-input"></i>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Cari resep, akun, atau tagar..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* 3. USER ACTIONS */}
        <div className="user-actions">
          <Link to="/notifications" className="action-icon notification-button">
            <i className="fas fa-bell"></i>
          </Link>
          
          <div className="profile-dropdown-wrapper">
            <Link to="/profile/me" className="profile-link">
              {/* Gunakan foto profil dari LocalStorage */}
              <div className="profile-pic" style={{ backgroundImage: profilePhoto ? `url(${profilePhoto})` : 'none' }}></div>
            </Link>
            
            <div className="profile-dropdown-menu">
              <div style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
                  @{username}
              </div>
              <Link to="/profile/me">Lihat Profil</Link>
              <Link to="/create">Buat Resep</Link>
              <Link to="/login" onClick={() => {
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('userProfileData'); // Hapus data profil saat logout
              }}>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarLoggedin;