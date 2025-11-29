import React, { useState } from "react";
import "./my-profile.css";
import { useNavigate } from "react-router-dom";

import profilePic from "../assets/geprek.jpeg";

const MyProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resep");

  return (
    <div className="myprofile-page">

      {/* HEADER */}
      <div className="myprofile-header">
        <button className="myprofile-back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <div className="myprofile-header-text">
          <strong>Profil Saya</strong>
          
        </div>
      </div>

      {/* COVER */}
      <div className="myprofile-cover"></div>

      {/* MAIN PROFILE SECTION */}
      <div className="myprofile-main">
        <img src={profilePic} alt="Profile" className="myprofile-photo" />

        <div className="myprofile-info">
          <h2 className="myprofile-name">Nama User (Saya)</h2>
          <div className="myprofile-followers"><strong>50</strong> Pengikut</div>
          <div className="myprofile-username">@username_saya</div>

          <p className="myprofile-bio">
            Ini adalah bio saya. Saya suka memasak dan mencoba resep baru setiap akhir pekan!
          </p>
        </div>

        <div className="myprofile-buttons">
          <button className="myprofile-edit-btn">Edit Profil</button>
          <button className="myprofile-link-btn">Buat Resep</button>
          <button className="myprofile-logout-btn">Logout</button>
        </div>
      </div>

      {/* SOCIAL LINKS */}
      <div className="myprofile-social">
        <a href="#"><i className="fab fa-tiktok"></i> TikTok</a>
        <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
        <a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a>
        <a href="#"><i className="fas fa-link"></i> Website</a>
      </div>

      {/* TABS */}
      <div className="myprofile-tabs">

        <div
          className={`tab ${activeTab === "resep" ? "active" : ""}`}
          onClick={() => setActiveTab("resep")}
        >
          <i className="fas fa-book-open"></i> Resep Saya
        </div>

        <div
          className={`tab ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          <i className="fas fa-bookmark"></i> Disimpan
        </div>

      </div>

      <div className="myprofile-tab-line"></div>

      {/* CONTENT */}
      <div className="myprofile-empty-section">
        {activeTab === "resep" ? (
          <div className="empty-box">
            <i className="fas fa-book-open empty-icon"></i>
            <h3>Belum ada resep yang dibagikan</h3>
            <p>Saat Anda membagikan resep, resep itu akan muncul di sini.</p>
          </div>
        ) : (
          <div className="empty-box">
            <i className="fas fa-bookmark empty-icon"></i>
            <h3>Belum ada resep tersimpan</h3>
            <p>Resep yang Anda simpan akan muncul di sini.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MyProfile;


