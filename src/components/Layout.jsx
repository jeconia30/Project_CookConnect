import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="loggedin-body">
      <Navbar />
      <main
        className="feed-container container"
        style={{ display: "flex", gap: "20px", marginTop: "20px" }}
      >
        {/* Sidebar Sticky (diletakkan di Layout) */}
        <div
          className="desktop-only"
          style={{
            width: "300px",
            flexShrink: 0,
            position: "sticky",
            top: "100px",
            height: "fit-content",
          }}
        >
          <Sidebar />
        </div>
        
        {/* Konten Halaman akan di-render di sini (Feed, Detail, Profil) */}
        <Outlet /> 
        
      </main>
      <Footer />
    </div>
  );
};

export default Layout;