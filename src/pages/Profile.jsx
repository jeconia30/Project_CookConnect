import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

import profilePic from "../assets/geprek.jpeg";
import imgGeprek from "../assets/geprek.jpeg";
import imgSoto from "../assets/soto.jpeg";
import imgNasgor from "../assets/nasgor.jpeg";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-container">

      {/* HEADER */}
      <div className="header-green">

        <button className="back-btn-fixed" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <div className="header-title-inline">
          <strong>Profil</strong>
          <span>@sari_masak</span>
        </div>

      </div>

      {/* KONTEN PUTIH */}
      <div className="content-wrapper">

        {/* FOTO PROFIL KIRI + INFO + FOLLOW BUTTON */}
        <div className="top-profile-row">

          {/* FOTO PROFIL KIRI */}
          <img src={profilePic} alt="Profile" className="profile-photo-left" />

          {/* INFO */}
          <div className="profile-info-block">
            <div className="name-follow-row">
              <h2 className="profile-name">Sari (Contoh)</h2>
              <span className="followers-count">1.200 Pengikut</span>
            </div>

            <div className="username-small">@sari_masak</div>
          </div>

          {/* FOLLOW BUTTON KANAN */}
          <button className="follow-btn">Ikuti</button>
        </div>

        {/* BIO */}
        <p className="bio-text">
          Hobi masak simpel yang enak! Ibu dari 2 anak.
          Suka berbagi resep harian anti-gagal.
        </p>

        {/* SOCIAL MEDIAS */}
        <div className="social-box-area">
          <a href="#" className="social-item"><i className="fab fa-tiktok"></i> TikTok</a>
          <a href="#" className="social-item"><i className="fab fa-instagram"></i> Instagram</a>
          <a href="#" className="social-item"><i className="fab fa-linkedin"></i> LinkedIn</a>
          <a href="#" className="social-item"><i className="fas fa-globe"></i> Website</a>
        </div>

        {/* TAB */}
        <div className="tab-header">
          <span className="tab-active"><i className="fas fa-book-open"></i> Resep</span>
        </div>

        {/* RESEP */}
        <div className="recipe-grid">
          <div className="recipe-card">
            <img src={imgGeprek} alt="geprek" />
            <h4>Ayam Geprek Sambal Matah</h4>
          </div>

          <div className="recipe-card">
            <img src={imgSoto} alt="soto" />
            <h4>Soto Ayam Lamongan</h4>
          </div>

          <div className="recipe-card">
            <img src={imgNasgor} alt="nasgor" />
            <h4>Nasi Goreng Ayam Kampung</h4>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;


