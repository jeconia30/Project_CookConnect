import React, { useState } from 'react';
import '../styles/components/RecipeCardFeed.css';

const RecipeCardFeed = ({ recipe }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(recipe.likes);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    setIsShared(!isShared);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  };

  return (
    <div className="feed-card">
      <div className="card-header">
        <div className="user-profile">
          <img src={recipe.avatar} alt="avatar" className="avatar" />
          <div className="user-info">
            <span className="username">{recipe.author}</span>
            <div className="handle-row">
                <span className="handle">@{recipe.handle}</span>
                <span className="separator"> • </span>
                <button 
                  className={`text-btn ${isFollowing ? 'grey' : 'green'}`}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? 'Mengikuti' : 'Ikuti'}
                </button>
            </div>
            <span className="time">{recipe.time}</span>
          </div>
        </div>
      </div>

      <h2 className="recipe-title">{recipe.title}</h2>

      <div className="card-body">
        <div className="recipe-steps">
          <ol>
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
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

      <hr className="divider" />

      <div className="card-footer">
        <button 
          className={`action-btn ${isLiked ? 'liked' : ''}`} 
          onClick={handleLike}
        >
          <svg 
            width="24" height="24" viewBox="0 0 24 24" 
            fill={isLiked ? "#e74c3c" : "none"} 
            stroke={isLiked ? "#e74c3c" : "#666"} 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>{formatNumber(likeCount)} Suka</span>
        </button>

        <button className="action-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>{recipe.comments} Komentar</span>
        </button>

        <button 
          className={`action-btn ${isShared ? 'shared' : ''}`}
          onClick={handleShare}
        >
          <svg 
            width="24" height="24" viewBox="0 0 24 24" 
            fill="none" 
            stroke={isShared ? "#007bff" : "#666"}
            strokeWidth={isShared ? "2.5" : "2"}
            strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span>Bagikan</span>
        </button>

        {/* REVISI: TOMBOL SIMPAN JADI HIJAU */}
        <button 
          className={`action-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSave}
        >
           <svg 
            width="24" height="24" viewBox="0 0 24 24" 
            fill={isSaved ? "#38761d" : "none"}     /* Fill Hijau */
            stroke={isSaved ? "#38761d" : "#666"}   /* Garis Hijau */
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
           >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
           <span>{isSaved ? 'Disimpan' : 'Simpan'}</span>
        </button>

      </div>
    </div>
  );
};

export default RecipeCardFeed;