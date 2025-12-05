import React from 'react';
import '../styles/components/NavbarLandingcss';
// Asumsi gaya untuk .main-header, .navbar, .logo, .nav-links, .cta-button 
// sudah diimpor di App.css atau index.css.

const NavbarLanding = () => {
  return (
    <header className="main-header">
      <nav className="navbar container">
        <div className="logo">CookConnect</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#preview">Featured Recipes</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#team">Team</a></li>
        </ul>
        <a href="/login" className="cta-button">Login / Register</a>
      </nav>
    </header>
  );
};

export default NavbarLanding;