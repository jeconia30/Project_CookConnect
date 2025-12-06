import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import api from '../api/axiosInstance'; // <-- KITA MATIKAN DULU
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- MOCK DATA (DATA PALSU SESUAI HTML KAMU) ---
  const mockRecipe = {
    id: '123',
    title: "Ayam Geprek Sambal Matah",
    description: "Ini dia resep ayam geprek andalanku! Resep cocok buat orang yang malas masak! Hanya butuh 15 menit, pedasnya nagih! #ayamgeprek #sambalmatah #masakcepat",
    image_url: "https://i.pinimg.com/736x/a2/62/77/a262776412f1709424e83c748259461f.jpg", // Gambar contoh internet
    total_time: 15,
    servings: 2,
    difficulty: "Mudah",
    created_at: new Date().toISOString(),
    username: "sari_masak",
    user_fullname: "Sari (Contoh)", // Tambahan field manual buat mock
    avatar_url: "https://ui-avatars.com/api/?name=Sari+Masak&background=random",
    like_count: 8100,
    comment_count: 120,
    is_liked: true, // Ceritanya user udah like
    is_saved: true, // Ceritanya user udah save
    
    // Array Bahan dari HTML kamu
    ingredients: [
      "2 potong ayam goreng (tepung)",
      "10 buah cabai rawit merah",
      "5 siung bawang merah",
      "2 batang sereh (ambil bagian putih)",
      "4 lembar daun jeruk (buang tulang)",
      "1/2 sdt terasi bakar",
      "Garam dan gula secukupnya",
      "5 sdm minyak kelapa panas"
    ],

    // Array Langkah dari HTML kamu
    steps: [
      "Siapkan Sambal: Ulek kasar cabai, bawang merah, dan terasi. Jangan terlalu halus.",
      "Iris Bumbu: Iris tipis sereh dan daun jeruk. Campur ke dalam ulekan cabai.",
      "Siram Minyak: Panaskan minyak kelapa (harus sangat panas). Siramkan langsung ke atas campuran sambal. Aduk rata.",
      "Geprek Ayam: Ambil ayam goreng tepung yang sudah siap, letakkan di atas cobek.",
      "Sajikan: Geprek atau tekan ayam menggunakan ulekan hingga sedikit hancur dan tercampur dengan sambal. Sajikan segera dengan nasi hangat."
    ]
  };

  // State langsung diisi mock data, tanpa loading
  const [recipe, setRecipe] = useState(mockRecipe);
  const [loading, setLoading] = useState(false); 

  /* // --- KODE BACKEND SEMENTARA DIMATIKAN ---
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);
  */

  if (loading) return <div style={{textAlign:'center', marginTop:'50px'}}>Sedang memuat resep... 🍳</div>;
  if (!recipe) return <div style={{textAlign:'center', marginTop:'50px'}}>Resep tidak ditemukan.</div>;

  return (
    <div className="loggedin-body">
      <Navbar />

      <main className="feed-container container" style={{display: 'flex', gap: '20px', marginTop: '20px'}}>
        
        <div style={{width: '300px', flexShrink: 0}} className="desktop-only">
           <Sidebar />
        </div>

        <div className="recipe-detail-container">
          
          {/* Header Detail */}
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
                style={{backgroundImage: `url(${recipe.avatar_url})`}}
              ></div>
              
              <div className="user-details-column">
                <div className="user-details-top">
                  <strong>{recipe.user_fullname || recipe.username}</strong>
                  <span className="username">@{recipe.username}</span>
                  <span className="dot-separator">•</span>
                  <button className="follow-button follow small">Ikuti</button>
                </div>
                <span className="post-meta">Diposkan 2 jam lalu</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="recipe-hero-image"
          />

          {/* Actions */}
          <div className="post-actions detail-page-actions">
            <button className={recipe.is_liked ? "like-active" : ""}>
              <i className={recipe.is_liked ? "fas fa-heart" : "far fa-heart"}></i> {recipe.like_count.toLocaleString()} Suka
            </button>
            <a href="#comments-section">
              <i className="far fa-comment"></i> {recipe.comment_count} Komentar
            </a>
            <button><i className="far fa-share-square"></i> Bagikan</button>
            <button className={recipe.is_saved ? "save-active" : ""}>
              <i className={recipe.is_saved ? "fas fa-bookmark" : "far fa-bookmark"}></i> Disimpan
            </button>
          </div>

          {/* Caption */}
          <div className="recipe-caption-full">
            <p>{recipe.description}</p>
          </div>

          {/* Meta Info */}
          <div className="recipe-meta-info">
            <div>
              <i className="fas fa-clock"></i> <strong>Total Waktu:</strong><br/> {recipe.total_time} Menit
            </div>
            <div>
              <i className="fas fa-utensils"></i> <strong>Porsi:</strong><br/> {recipe.servings} orang
            </div>
            <div>
              <i className="fas fa-star"></i> <strong>Kesulitan:</strong><br/> {recipe.difficulty}
            </div>
          </div>

          {/* Main Content */}
          <div className="recipe-main-content-wrapper">
            
            <div className="recipe-ingredients">
              <h3><i className="fas fa-shopping-cart"></i> Bahan-Bahan</h3>
              <ul>
                {recipe.ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="recipe-instructions">
              <h3><i className="fas fa-list-ol"></i> Langkah-Langkah</h3>
              <ol>
                {recipe.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Video Links */}
          <div className="recipe-video-links">
             <h3><i className="fas fa-video"></i> Tonton Video Resep</h3>
             <ul className="video-link-list">
                <li>
                  <a href="#" className="video-link-tiktok" style={{background: 'black'}}><i className="fab fa-tiktok"></i> TikTok</a>
                </li>
                <li>
                  <a href="#" className="video-link-youtube" style={{background: 'red'}}><i className="fab fa-youtube"></i> YouTube</a>
                </li>
             </ul>
          </div>

          {/* Comments Dummy */}
          <div className="comments-section" id="comments-section">
            <h3><i className="fas fa-comments"></i> 10 Komentar</h3>
            <div style={{marginTop: '20px', color: '#666', fontStyle: 'italic'}}>
               (Komentar dummy: "Wah enak banget!", "Recook ah!", dll...)
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;