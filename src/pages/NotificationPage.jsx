// src/pages/NotificationPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
// Import CSS baru

const mockNotifications = [
    {
        id: 1,
        type: 'comment',
        user: 'budi_rendang',
        message: 'mengomentari resep Anda: "Wah, keliatannya pedes banget!"',
        time: '5m lalu',
        link: '/recipe/1#comments-section'
    },
    {
        id: 2,
        type: 'like',
        user: 'chef_yuni',
        message: 'menyukai resep "Brownies Kukus 3 Bahan" Anda.',
        time: '1j lalu',
        link: '/recipe/3'
    },
    {
        id: 3,
        type: 'follow',
        user: 'pakrt_sebelah',
        message: 'mulai mengikuti Anda.',
        time: '3j lalu',
        link: '/profile/budi_rendang' // Contoh link ke profil orang
    },
    {
        id: 4,
        type: 'save',
        user: 'dapur_ina',
        message: 'menyimpan resep "Soto Ayam Lamongan" Anda.',
        time: '1h lalu',
        link: '/recipe/5'
    },
];

const NotificationPage = () => {
  return (
    // Gunakan feed-area agar konten sejajar dengan Sidebar
    <div className="feed-area notification-page-content"> 
      <h1><i className="fas fa-bell"></i> Notifikasi Terbaru</h1>
      <p className="notification-desc">Semua aktivitas terkait resep dan profil Anda:</p>

      <div className="notification-list">
        {mockNotifications.length > 0 ? (
          mockNotifications.map(notif => (
            <Link to={notif.link} key={notif.id} className="notification-item">
              <div className={`icon-indicator ${notif.type}`}>
                <i className={`fas ${
                  notif.type === 'comment' ? 'fa-comment' :
                  notif.type === 'like' ? 'fa-heart' :
                  notif.type === 'follow' ? 'fa-user-plus' :
                  'fa-bookmark'
                }`}></i>
              </div>
              <div className="notification-text">
                <strong>@{notif.user}</strong> {notif.message}
                <span className="notification-time">{notif.time}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <i className="fas fa-box-open"></i>
            <p>Tidak ada notifikasi baru.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;