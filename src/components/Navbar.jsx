// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import "../styles/components/Navbar.css";

const NavbarLoggedin = () => {
  const [keyword, setKeyword] = useState('');
  const [userData, setUserData] = useState({});
  const [unreadCount, setUnreadCount] = useState(0); 
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem('userProfileData') || '{}');
        setUserData(storedData);

        if (storedData.id) {
          const response = await api.get(`/notifications/${storedData.id}`);
          const notifs = response.data;

          // --- LOGIKA BARU ---
          // 1. Ambil waktu terakhir user mengecek notifikasi dari localStorage
          const lastCheckKey = `last_notif_check_${storedData.id}`;
          const lastCheckTime = localStorage.getItem(lastCheckKey);

          // 2. Hitung notifikasi yang tanggalnya LEBIH BARU dari waktu terakhir cek
          const unread = notifs.filter(n => {
            if (!lastCheckTime) return true; // Kalau belum pernah cek, anggap semua belum dibaca
            return new Date(n.created_at) > new Date(lastCheckTime);
          }).length;

          setUnreadCount(unread); 
        }
      } catch (e) {
        console.error("Gagal mengambil data navbar:", e);
      }
    };

    fetchData();
  }, []); // Dependency array kosong agar jalan saat mount (login/refresh)

  const profilePhoto = userData.avatar_url || userData.photo || null;
  const username = userData.username || "user";

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedKeyword = keyword.trim();
      if (trimmedKeyword) {
        navigate(`/feed?q=${trimmedKeyword}`); 
      }
    }
  };

  // ✅ FUNGSI BARU: Hilangkan notifikasi & SIMPAN statusnya
  const handleNotificationClick = () => {
    setUnreadCount(0);
    
    if (userData.id) {
      // Simpan waktu sekarang sebagai waktu terakhir user melihat notifikasi
      const lastCheckKey = `last_notif_check_${userData.id}`;
      localStorage.setItem(lastCheckKey, new Date().toISOString());
    }
  };

  return (
    <header className="main-header">
      <nav className="navbar container">
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
          {/* Tambahkan onClick disini */}
          <Link 
            to="/notifications" 
            className="action-icon notification-button"
            onClick={handleNotificationClick}
          >
            <i className="fas fa-bell"></i>
            
            {/* Logic Badge: Hanya muncul jika unreadCount > 0 */}
            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Link>
          
          <div className="profile-dropdown-wrapper">
            <Link to="/profile/me" className="profile-link">
              <div 
                className="profile-pic" 
                style={{ 
                  backgroundImage: profilePhoto ? `url("${profilePhoto}")` : 'none',
                  backgroundColor: profilePhoto ? 'transparent' : '#ccc',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #38761d'
                }}
              >
                {!profilePhoto && (
                  <i className="fas fa-user" style={{ color: '#fff', fontSize: '1.2rem' }}></i>
                )}
              </div>
            </Link>
            
            <div className="profile-dropdown-menu">
              <div style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#333' }}>
                  @{username}
              </div>
              <Link to="/profile/me">Lihat Profil</Link>
              <Link to="/create">Buat Resep</Link>
              <Link to="/login" onClick={() => {
                  // Jangan clear semua localStorage agar status notif tetap tersimpan
                  // Hapus item spesifik auth saja
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('userProfileData');
                  // Jangan hapus `last_notif_check_...`
              }}>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarLoggedin;