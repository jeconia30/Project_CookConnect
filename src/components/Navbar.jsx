import React from 'react';
// Asumsi gaya untuk .main-header, .navbar, .logo-link, .user-actions, 
// .action-icon, .profile-dropdown-wrapper, .profile-pic, dll.
// sudah diimpor dari App.css.

const NavbarLoggedin = () => {
  return (
    <header className="main-header">
      <nav className="navbar container">
        <a href="/feed" className="logo-link">
          <div className="logo">CookConnect</div>
        </a>
        <div className="user-actions">
          <a href="#notifications" className="action-icon notification-button">
            <i className="fas fa-bell"></i>
          </a>
          <div className="profile-dropdown-wrapper">
            <a href="/profile/me" className="profile-link">
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