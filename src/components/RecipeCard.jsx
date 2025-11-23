import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css'; 

const RecipeCard = ({ title, meta, teaser, likes, imageSrc, altText }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-like-badge">
        <i className="fas fa-heart icon-like"></i> {likes}
      </div>
      <img src={imageSrc} alt={altText} className="recipe-image" />
      <h4 className="recipe-title">{title}</h4>
      <p className="recipe-meta">{meta}</p>
      <p className="recipe-teaser">
        "{teaser}"
      </p>
      <Link to="/login" className="read-more">Lihat Detail</Link>
    </div>
  );
};

export default RecipeCard;