import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import "../styles/components/RecipeCardFeed.css";

const RecipeCardFeed = ({ recipe }) => {
  if (!recipe) return null;

  const authToken = localStorage.getItem("authToken");

  const parseList = (data) => {
    if (!data) return [];

    if (Array.isArray(data)) {
      return data.filter(item => item && item.trim() !== "");
    }

    if (typeof data === 'string') {
      const trimmed = data.trim();
      
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          return JSON.parse(trimmed);
        } catch (e) {
          console.warn("Gagal parse JSON, lanjut ke manual split");
        }
      }

      if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        return trimmed.slice(1, -1).split(',').map(s => s.replace(/"/g, '').trim());
      }

      if (trimmed.includes('\n')) {
        return trimmed.split('\n').filter(s => s.trim() !== "");
      }

      if (trimmed.includes(',')) {
        return trimmed.split(',').filter(s => s.trim() !== "");
      }

      return [trimmed];
    }

    return [];
  };

  const ingredients = parseList(recipe.ingredients);
  const steps = parseList(recipe.steps);

  const [isLiked, setIsLiked] = useState(recipe.is_liked || false);
  const [likeCount, setLikeCount] = useState(recipe.likes || 0);
  const [isFollowing, setIsFollowing] = useState(recipe.is_following || false);
  const [isSaved, setIsSaved] = useState(recipe.is_saved || false);

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
    const endpoint = isFollowing ? `/users/${recipe.handle}/unfollow` : `/users/${recipe.handle}/follow`;
    handleAction(endpoint, () => setIsFollowing(!isFollowing));
  };

  const formatNumber = (num) => (num >= 1000 ? (num / 1000).toFixed(1) + "K" : num);

  return (
    <div className="feed-card">
      <div className="card-header">
        <div className="user-profile">
          <img src={recipe.avatar || "https://placehold.co/50"} alt="avatar" className="avatar" />
          <div className="user-info">
            <Link to={`/profile/${recipe.handle}`} className="username">{recipe.author}</Link>
            <div className="handle-row">
              <span className="handle">@{recipe.handle}</span>
              <span className="separator">•</span>
              <button className={`text-btn ${isFollowing ? "grey" : "green"}`} onClick={handleFollow}>
                {isFollowing ? "Mengikuti" : "Ikuti"}
              </button>
            </div>
            <span className="time">{recipe.time}</span>
          </div>
        </div>
      </div>

      <Link to={`/recipe/${recipe.id}`} className="card-content-link">
        <h2 className="recipe-title">{recipe.title}</h2>

        <div className="card-body">
          <div className="recipe-text-content">
            
            {ingredients.length > 0 ? (
              <div className="preview-section">
                <strong><i className="fas fa-shopping-basket"></i> Bahan:</strong>
                <ul className="preview-list">
                  {ingredients.slice(0, 3).map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                  {ingredients.length > 3 && <li>...dan lainnya</li>}
                </ul>
              </div>
            ) : (
              <p className="card-desc-only" style={{fontStyle: 'italic', color: '#999'}}>
                {recipe.description ? recipe.description : "Tidak ada deskripsi singkat."}
              </p>
            )}

            {steps.length > 0 && (
              <div className="preview-section" style={{ marginTop: '10px' }}>
                <strong><i className="fas fa-list"></i> Cara Buat:</strong>
                <ol className="preview-list">
                  {steps.slice(0, 2).map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                  {steps.length > 2 && <li>...</li>}
                </ol>
              </div>
            )}
          </div>

          <div className="recipe-img-wrapper">
            <img src={recipe.image || "https://placehold.co/150"} alt={recipe.title} className="recipe-img" />
          </div>
        </div>
      </Link>

      <div className="card-footer">
        <button className={`action-btn ${isLiked ? "liked" : ""}`} onClick={handleLike}>
          <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i> 
          <span>{formatNumber(likeCount)} Suka</span>
        </button>
        <Link to={`/recipe/${recipe.id}#comments-section`} className="action-btn">
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
