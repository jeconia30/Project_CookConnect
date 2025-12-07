// src/components/RecipeCardFeed.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Wajib import Link
import api from "../api/axiosInstance"; // Import API
import "../styles/components/RecipeCardFeed.css";

const RecipeCardFeed = ({ recipe }) => {
  // Pastikan recipe tidak null/undefined sebelum mengakses properti
  if (!recipe) return null;

  const authToken = localStorage.getItem("authToken");

  // STATE INTERAKSI (Diasumsikan API mengembalikan status awal di object recipe)
  const [isLiked, setIsLiked] = useState(recipe.is_liked || false);
  const [likeCount, setLikeCount] = useState(recipe.likes || 0);
  const [isFollowing, setIsFollowing] = useState(recipe.is_following || false);
  const [isShared, setIsShared] = useState(false);
  const [isSaved, setIsSaved] = useState(recipe.is_saved || false);

  // --- HANDLER API SIMULASI ---
  const handleAction = async (endpoint, actionName, successCallback) => {
    if (!authToken) {
      alert("Anda harus login untuk melakukan aksi ini.");
      return;
    }
    try {
      await api.post(
        endpoint,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      successCallback();
    } catch (err) {
      alert(`Gagal memproses ${actionName}.`);
    }
  };

  const handleLike = () => {
    const endpoint = isLiked
      ? `/recipes/${recipe.id}/unlike`
      : `/recipes/${recipe.id}/like`;
    handleAction(endpoint, "Suka", () => {
      setIsLiked(!isLiked);
      setLikeCount((prev) => prev + (isLiked ? -1 : 1));
    });
  };

  const handleSave = () => {
    const endpoint = isSaved
      ? `/recipes/${recipe.id}/unsave`
      : `/recipes/${recipe.id}/save`;
    handleAction(endpoint, "Simpan", () => {
      setIsSaved(!isSaved);
    });
  };

  const handleFollow = () => {
    const endpoint = isFollowing
      ? `/users/${recipe.handle}/unfollow`
      : `/users/${recipe.handle}/follow`;
    handleAction(endpoint, "Ikuti", () => {
      setIsFollowing(!isFollowing);
    });
  };

  const handleShare = () => {
    alert("Tautan resep disalin!");
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  return (
    <div className="feed-card">
      <div className="card-header">
        <div className="user-profile">
          <img src={recipe.avatar} alt="avatar" className="avatar" />
          <div className="user-info">
            {/* LINK KE PROFIL ORANG LAIN */}
            <Link
              to={`/profile/${recipe.handle}`}
              className="username"
              style={{ textDecoration: "none", color: "#000" }}
            >
              {recipe.author}
            </Link>
            <div className="handle-row">
              <span className="handle">@{recipe.handle}</span>
              <span className="separator"> • </span>
              <button
                className={`text-btn ${isFollowing ? "grey" : "green"}`}
                onClick={handleFollow}
              >
                {isFollowing ? "Mengikuti" : "Ikuti"}
              </button>
            </div>
            <span className="time">{recipe.time}</span>
          </div>
        </div>
      </div>

      {/* AREA KLIK UTAMA (JUDUL, GAMBAR, DESKRIPSI) -> LINK KE DETAIL */}
      <Link
        to={`/recipe/${recipe.id}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <h2 className="recipe-title">{recipe.title}</h2>

        <div className="card-body">
          <div className="recipe-steps">
            <ol>
              {/* FIX UTAMA: Pengecekan Array.isArray(recipe.steps) */}
              {Array.isArray(recipe.steps) &&
                recipe.steps
                  .slice(0, 3)
                  .map((step, idx) => <li key={idx}>{step}</li>)}
            </ol>
          </div>
          <div className="recipe-img-wrapper">
            <img src={recipe.image} alt={recipe.title} className="recipe-img" />
          </div>
        </div>

        <div className="card-desc">
          <p>{recipe.description}</p>
          <p className="hashtags">{recipe.hashtags}</p>
        </div>
      </Link>

      <hr className="divider" />

      {/* 3. FOOTER (TOMBOL AKSI) */}
      <div className="card-footer">
        {/* Tombol Like */}
        <button
          className={`action-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isLiked ? "#e74c3c" : "none"}
            stroke={isLiked ? "#e74c3c" : "#666"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>{formatNumber(likeCount)} Suka</span>
        </button>

        {/* Tombol Komentar -> Langsung ke Section Komentar */}
        <Link
          to={`/recipe/${recipe.id}#comments-section`}
          className="action-btn"
          style={{ textDecoration: "none" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>{recipe.comments} Komentar</span>
        </Link>

        {/* Tombol Bagikan */}
        <button
          className={`action-btn ${isShared ? "shared" : ""}`}
          onClick={handleShare}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isShared ? "#007bff" : "#666"}
            strokeWidth={isShared ? "2.5" : "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span>Bagikan</span>
        </button>

        {/* Tombol Simpan */}
        <button
          className={`action-btn ${isSaved ? "saved" : ""}`}
          onClick={handleSave}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isSaved ? "#38761d" : "none"}
            stroke={isSaved ? "#38761d" : "#666"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>{isSaved ? "Disimpan" : "Simpan"}</span>
        </button>
      </div>
    </div>
  );
};

export default RecipeCardFeed;
