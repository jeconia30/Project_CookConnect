import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import "../styles/components/RecipeCardFeed.css";

const RecipeCardFeed = ({ recipe }) => {
  if (!recipe) return null;

  const authToken = localStorage.getItem("authToken");
  const currentUserData = JSON.parse(localStorage.getItem('userProfileData') || '{}');
  const currentUsername = currentUserData.username;

  // Data Mapping
  const displayName = recipe.user_fullname || recipe.full_name || recipe.name || recipe.author || "Pengguna";
  const displayHandle = recipe.username || recipe.handle || "user";
  const displayAvatar = recipe.avatar_url || recipe.avatar || "https://placehold.co/50";
  
  const isOwnRecipe = currentUsername === displayHandle;

  // Parsing steps/ingredients (Helper)
  const parseList = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data.filter(item => item && item.trim() !== "");
    if (typeof data === 'string') {
      const trimmed = data.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try { return JSON.parse(trimmed); } catch (e) { console.warn("JSON parse fail"); }
      }
      if (trimmed.includes('\n')) return trimmed.split('\n').filter(s => s.trim() !== "");
      return [trimmed];
    }
    return [];
  };

  const ingredients = parseList(recipe.ingredients);
  const steps = parseList(recipe.steps);

  // States
  const [isLiked, setIsLiked] = useState(recipe.is_liked || false);
  const [likeCount, setLikeCount] = useState(recipe.like_count || recipe.likes || 0);
  const [isFollowing, setIsFollowing] = useState(recipe.is_following || false);
  const [isSaved, setIsSaved] = useState(recipe.is_saved || false);

  // Handlers
  const handleAction = async (endpoint, successCallback) => {
    if (!authToken) return alert("Login dulu!");
    try {
      await api.post(endpoint, {}, { headers: { Authorization: `Bearer ${authToken}` } });
      successCallback();
    } catch (err) { console.error(err); }
  };

  const handleLike = () => {
    const endpoint = isLiked ? `/recipes/${recipe.id}/unlike` : `/recipes/${recipe.id}/like`;
    handleAction(endpoint, () => { setIsLiked(!isLiked); setLikeCount(p => p + (isLiked ? -1 : 1)); });
  };

  const handleSave = () => {
    const endpoint = isSaved ? `/recipes/${recipe.id}/unsave` : `/recipes/${recipe.id}/save`;
    handleAction(endpoint, () => setIsSaved(!isSaved));
  };

  const handleFollow = () => {
    const endpoint = isFollowing ? `/users/${displayHandle}/unfollow` : `/users/${displayHandle}/follow`;
    handleAction(endpoint, () => setIsFollowing(!isFollowing));
  };

  const formatNumber = (num) => (num >= 1000 ? (num / 1000).toFixed(1) + "K" : num);

  return (
    <div className="feed-card">
      <div className="card-header">
        <div className="user-profile">
          <img src={displayAvatar} alt="avatar" className="avatar" />
          
          <div className="user-info">
            {/* === BARIS 1: NAMA, USERNAME, TOMBOL IKUTI === */}
            <div className="user-info-top">
              <Link to={`/profile/${displayHandle}`} className="username">
                {displayName}
              </Link>
              
              <span className="handle">@{displayHandle}</span>

              {!isOwnRecipe && (
                <>
                  <span className="separator">•</span>
                  <button 
                    className={`text-btn ${isFollowing ? "grey" : "green"}`} 
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Mengikuti" : "Ikuti"}
                  </button>
                </>
              )}
            </div>

            {/* === BARIS 2: TANGGAL === */}
            <span className="time">
              {recipe.time || new Date(recipe.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <Link to={`/recipe/${recipe.id}`} className="card-content-link">
        <div className="card-body">
          <div className="recipe-text-content">
            <h2 className="recipe-title">{recipe.title}</h2>
            {/* Preview Steps / Ingredients */}
            {steps.length > 0 ? (
              <div className="preview-section">
                <strong><i className="fas fa-list"></i> Cara Buat:</strong>
                <ol className="preview-list">
                  {steps.slice(0, 2).map((step, i) => <li key={i}>{step}</li>)}
                  {steps.length > 2 && <li>...</li>}
                </ol>
              </div>
            ) : ingredients.length > 0 ? (
               <div className="preview-section">
                <strong><i className="fas fa-shopping-basket"></i> Bahan:</strong>
                <ul className="preview-list">
                  {ingredients.slice(0, 3).map((ing, i) => <li key={i}>{ing}</li>)}
                  {ingredients.length > 3 && <li>...dan lainnya</li>}
                </ul>
              </div>
            ) : null}
            <p className="card-desc-only">
              {recipe.description ? recipe.description : "Tidak ada deskripsi singkat."}
            </p>
          </div>
          <div className="recipe-img-wrapper">
            <img 
              src={recipe.image_url || recipe.image || "https://placehold.co/300"} 
              alt={recipe.title} 
              className="recipe-img" 
            />
          </div>
        </div>
      </Link>

      <div className="card-footer">
        <button className={`action-btn ${isLiked ? "liked" : ""}`} onClick={handleLike}>
          <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i> 
          <span>{formatNumber(likeCount)} Suka</span>
        </button>
        <Link to={`/recipe/${recipe.id}#comments-section`} className="action-btn" style={{ textDecoration: 'none' }}>
          <i className="far fa-comment"></i> 
          <span>{recipe.comments || 0} Komentar</span>
        </Link>
        <button className="action-btn" onClick={() => alert('Disalin!')}>
          <i className="far fa-share-square"></i>
          <span>Bagikan</span>
        </button>
        <button className={`action-btn ${isSaved ? "saved" : ""}`} onClick={handleSave}>
          <i className={isSaved ? "fas fa-bookmark" : "far fa-bookmark"}></i>
          <span>{isSaved ? "Disimpan" : "Simpan"}</span>
        </button>
      </div>
    </div>
  );
};

export default RecipeCardFeed;