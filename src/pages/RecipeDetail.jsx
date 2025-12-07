import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentsSection from "../components/CommentsSection";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const mockRecipe = {
    id: "123",
    title: "Ayam Geprek Sambal Matah",
    description:
      "Ini dia resep ayam geprek andalanku! Pedasnya nagih, cocok buat makan siang.",
    image_url:
      "https://i.pinimg.com/736x/a2/62/77/a262776412f1709424e83c748259461f.jpg",
    total_time: 15,
    servings: 2,
    difficulty: "Mudah",
    created_at: new Date().toISOString(),
    username: "sari_masak",
    user_fullname: "Sari (Contoh)",
    avatar_url: "https://ui-avatars.com/api/?name=Sari+Masak&background=random",
    like_count: 8100,
    comment_count: 10,
    is_liked: false, // Default false biar bisa dites klik
    is_saved: false,
    ingredients: [
      "2 potong ayam goreng (tepung)",
      "10 buah cabai rawit merah",
      "5 siung bawang merah",
      "2 batang sereh (ambil bagian putih)",
      "Minyak panas secukupnya",
    ],
    steps: [
      "Ulek kasar cabai dan bawang.",
      "Iris tipis sereh, campurkan.",
      "Siram minyak panas ke sambal.",
      "Geprek ayam di atas cobek.",
    ],
  };

  const dummyComments = [
    {
      name: "Budi Santoso",
      username: "@budi_rendang",
      text: "Wah, keliatannya pedes banget! Jadi lapar!",
      time: "2 jam lalu",
    },
    {
      name: "Chef Yuni",
      username: "@chef_yuni",
      text: "Tips: minyaknya harus beneran panas biar wangi serehnya keluar. Mantap resepnya!",
      time: "1 jam lalu",
    },
    {
      name: "Dapur Ibu Ina",
      username: "@dapur_ina",
      text: "Ini sambal matahnya disiram minyak panas biasa atau minyak kelapa, ya?",
      time: "1 jam lalu",
    },
    {
      name: "Resep Simple",
      username: "@resep_simple",
      text: "Keliatannya gampang, weekend ini fix coba!",
      time: "55 menit lalu",
    },
    {
      name: "Si Pecinta Sambal",
      username: "@sambal_lover",
      text: "Auto ngiler liat sambelnya... 🤤",
      time: "48 menit lalu",
    },
    {
      name: "Bang RT Sebelah",
      username: "@nasgor_bang_rt",
      text: "Mantap! Lebih nendang lagi kalau ayamnya digeprek beneran sampe ancur.",
      time: "30 menit lalu",
    },
  ];

  // --- STATE HALAMAN ---
  const [recipe] = useState(mockRecipe);

  // --- STATE INTERAKSI (BARU) ---
  const [isLiked, setIsLiked] = useState(mockRecipe.is_liked);
  const [likeCount, setLikeCount] = useState(mockRecipe.like_count);
  const [isSaved, setIsSaved] = useState(mockRecipe.is_saved);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // --- HANDLER FUNCTIONS (LOGIKA KLIK) ---
  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    setIsShared(!isShared);
    alert("Link berhasil disalin! (Ceritanya)");
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  return (
    <div className="loggedin-body">
   

      <main
        className="feed-container container"
        style={{ display: "flex", gap: "20px", marginTop: "20px" }}
      >
       
        {/* Konten Utama */}
        <div className="recipe-detail-container">
          <div className="recipe-detail-header">
            <div className="recipe-title-group">
              <button className="back-button" onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left"></i>
              </button>
              <h1 className="recipe-detail-title">{recipe.title}</h1>
            </div>

            <div className="post-header revised">
              <div
                className="profile-pic-small"
                style={{ backgroundImage: `url(${recipe.avatar_url})` }}
              ></div>
              <div className="user-details-column">
                <div className="user-details-top">
                  <strong>{recipe.user_fullname}</strong>
                  <span className="username">@{recipe.username}</span>

                  <span className="dot-separator">•</span>

                  {/* TOMBOL FOLLOW TEXT ONLY (Tanpa Kotak) */}
                  <button
                    className="follow-button text-only"
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Mengikuti" : "Ikuti"}
                  </button>
                </div>
                <span className="post-meta">Diposkan 2 jam lalu</span>
              </div>
            </div>
          </div>

          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="recipe-hero-image"
          />

          {/* ACTIONS BAR (SUDAH DINAMIS) */}
          <div className="post-actions detail-page-actions">
            {/* LIKE BUTTON */}
            <button
              onClick={handleLike}
              className={isLiked ? "like-active" : ""}
            >
              <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i>
              {formatNumber(likeCount)} Suka
            </button>

            {/* COMMENT BUTTON (Scroll ke bawah) */}
            <a
              href="#comments-section"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <i className="far fa-comment"></i> {recipe.comment_count} Komentar
            </a>

            {/* SHARE BUTTON */}
            <button
              onClick={handleShare}
              className={isShared ? "share-active" : ""}
              style={{ color: isShared ? "#007bff" : "#555" }}
            >
              <i className="far fa-share-square"></i> Bagikan
            </button>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              className={isSaved ? "save-active" : ""}
            >
              <i
                className={isSaved ? "fas fa-bookmark" : "far fa-bookmark"}
              ></i>
              {isSaved ? "Disimpan" : "Simpan"}
            </button>
          </div>

          <div className="recipe-caption-full">
            <p>{recipe.description}</p>
          </div>

          <div className="recipe-meta-info">
            <div>
              <i className="fas fa-clock"></i> <strong>Waktu</strong>
              <br />
              {recipe.total_time} Menit
            </div>
            <div>
              <i className="fas fa-utensils"></i> <strong>Porsi</strong>
              <br />
              {recipe.servings} Orang
            </div>
            <div>
              <i className="fas fa-star"></i> <strong>Level</strong>
              <br />
              {recipe.difficulty}
            </div>
          </div>

          <div className="recipe-main-content-wrapper">
            <div className="recipe-ingredients">
              <h3>
                <i className="fas fa-shopping-cart"></i> Bahan-Bahan
              </h3>
              <ul>
                {recipe.ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="recipe-instructions">
              <h3>
                <i className="fas fa-list-ol"></i> Langkah-Langkah
              </h3>
              <ol>
                {recipe.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="recipe-video-links">
            <h3>
              <i className="fas fa-video"></i> Tonton Video Resep
            </h3>
            <div className="video-link-list">
              <a href="#" className="video-link-tiktok">
                <i className="fab fa-tiktok"></i> Tonton di TikTok
              </a>
              <a href="#" className="video-link-youtube">
                <i className="fab fa-youtube"></i> Tonton di YouTube
              </a>
              <a
                href="#"
                className="video-link-instagram"
                style={{ background: "#E1306C" }}
              >
                <i className="fab fa-instagram"></i> Tonton di Instagram
              </a>
            </div>
          </div>

          <CommentsSection
            comments={dummyComments}
            commentCount={recipe.comment_count}
          />
        </div>
      </main>


    </div>
  );
};

export default RecipeDetail;
