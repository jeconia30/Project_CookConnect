import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link & useNavigate
import "../styles/components/Navbar.css";

const NavbarLoggedin = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); // Hook untuk navigasi via function

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Contoh navigasi search
      alert(`Mencari: ${keyword}`); 
      // navigate(`/search?q=${keyword}`); 
    }
  };

  return (
    <header className="main-header">
      <nav className="navbar container">
        {/* GANTI a href DENGAN Link to */}
        <Link to="/feed" className="logo-link">
          <div className="logo">CookConnect</div>
        </Link>

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

        <div className="user-actions">
          <Link to="/notifications" className="action-icon notification-button">
            <i className="fas fa-bell"></i>
          </Link>
          
          <div className="profile-dropdown-wrapper">
            {/* Arahkan ke rute profil yang kamu inginkan */}
            <Link to="/profile/me" className="profile-link">
              <div className="profile-pic"></div>
            </Link>
            
            <div className="profile-dropdown-menu">
              <Link to="/profile/me">Lihat Profil</Link>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarLoggedin;