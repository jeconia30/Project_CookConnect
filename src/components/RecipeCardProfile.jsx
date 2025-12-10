import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/RecipeCardProfile.css"; // Kita akan buat CSS ini di langkah 2

const RecipeCardProfile = ({ recipe }) => {
  // ✅ PERBAIKAN: Gunakan 'image' ATAU 'image_url' (karena backend kadang kirim beda nama)
  const imageUrl =
    recipe.image ||
    recipe.image_url ||
    "https://placehold.co/300?text=No+Image";

  return (
    <Link to={`/recipe/${recipe.id}`} className="profile-card-link">
      <div className="profile-recipe-card">
        {/* Wrapper gambar untuk memastikan rasio kotak */}
        <div className="profile-card-img-wrapper">
          {/* Gunakan variabel imageUrl yang sudah diperbaiki */}
          <img src={imageUrl} alt={recipe.title} loading="lazy" />
        </div>

        {/* Info Judul */}
        <div className="profile-card-info">
          <h4>{recipe.title}</h4>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCardProfile;
