import React, { useState } from 'react';
import "../styles/components/Navbar.css"; // Pastikan CSS diimport

const NavbarLoggedin = () => {
  const [keyword, setKeyword] = useState('');

  // Fungsi untuk menangani pencarian
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // LOGIKA PENCARIAN DI SINI
      // Contoh: Navigasi ke halaman hasil atau filter resep
      console.log('Melakukan pencarian untuk:', keyword);
      alert(`Mencari resep: ${keyword}`); 
    }
  };

  return (
    <header className="main-header">
      <nav className="navbar container">
        {/* 1. LOGO */}
        <a href="/feed" className="logo-link">
          <div className="logo">CookConnect</div>
        </a>

        {/* 2. SEARCH BAR (BARU) */}
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
          <a href="#notifications" className="action-icon notification-button">
            <i className="fas fa-bell"></i>
          </a>
          
          <div className="profile-dropdown-wrapper">
            <a href="/profile/me" className="profile-link">
              {/* Profile pic placeholder */}
              <div className="profile-pic"></div>
            </a>
            
            {/* Dropdown Menu */}
            <div className="profile-dropdown-menu">
              <a href="/profile/me">Lihat Profil</a>
              <a href="/">Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarLoggedin;