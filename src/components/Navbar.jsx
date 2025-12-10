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
          // Set jumlah notifikasi awal dari API
          setUnreadCount(notifs.length); 
        }
      } catch (e) {
        console.error("Gagal mengambil data navbar:", e);
      }
    };

    fetchData();
  }, []);

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

  // ✅ FUNGSI BARU: Hilangkan notifikasi saat diklik
  const handleNotificationClick = () => {
    setUnreadCount(0);
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
          {/* ✅ TAMBAHKAN onClick={handleNotificationClick} DI SINI */}
          <Link 
            to="/notifications" 
            className="action-icon notification-button"
            onClick={handleNotificationClick}
          >
            <i className="fas fa-bell"></i>
            
            {/* Hanya tampilkan badge jika unreadCount > 0 */}
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
                  localStorage.clear(); 
              }}>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarLoggedin;