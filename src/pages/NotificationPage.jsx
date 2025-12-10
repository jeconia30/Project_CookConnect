// src/pages/NotificationPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance'; 

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Ambil user ID dari localStorage (disimpan saat login)
        const userProfile = JSON.parse(localStorage.getItem('userProfileData'));
        const userId = userProfile?.id;

        if (!userId) return; // Jika belum login/data hilang

        const response = await api.get(`/notifications/${userId}`);
        setNotifications(response.data);

        // ✅ LOGIKA BARU DI SINI:
        // Update waktu terakhir cek notifikasi di localStorage saat halaman dibuka.
        // Ini memastikan badge merah di Navbar hilang otomatis jika user membuka halaman ini.
        const lastCheckKey = `last_notif_check_${userId}`;
        localStorage.setItem(lastCheckKey, new Date().toISOString());

      } catch (error) {
        console.error("Gagal mengambil notifikasi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="feed-area notification-page-content"> 
      <h1><i className="fas fa-bell"></i> Notifikasi Terbaru</h1>
      <p className="notification-desc">Aktivitas terbaru:</p>

      {isLoading ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Memuat notifikasi...</p>
      ) : (
        <div className="notification-list">
          {notifications.length > 0 ? (
            notifications.map(notif => {
              // Tentukan link tujuan berdasarkan tipe notifikasi
              let linkTo = '#';
              if (notif.recipe_id) linkTo = `/recipe/${notif.recipe_id}`;
              else if (notif.type === 'follow') linkTo = `/profile/${notif.username}`; // Asumsi backend kirim username sender

              return (
                <Link to={linkTo} key={notif.id} className="notification-item">
                  <div className={`icon-indicator ${notif.type}`}>
                    <i className={`fas ${
                      notif.type === 'comment' ? 'fa-comment' :
                      notif.type === 'like' ? 'fa-heart' :
                      notif.type === 'follow' ? 'fa-user-plus' :
                      'fa-bookmark'
                    }`}></i>
                  </div>
                  <div className="notification-text">
                    <strong>@{notif.username || 'user'}</strong> {notif.message}
                    <span className="notification-time">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="empty-state">
              <i className="fas fa-box-open"></i>
              <p>Tidak ada notifikasi baru.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;