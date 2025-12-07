import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import CommentsSection from "../components/CommentsSection";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]); // State untuk daftar komentar
  const [commentInput, setCommentInput] = useState(""); // State untuk input form
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state saat kirim komentar
  const authToken = localStorage.getItem("authToken");

  // --- MOCK DATA (Digunakan sebagai fallback) ---
  const MOCK_RECIPE = {
    id: "123",
    title: "Ayam Geprek Sambal Matah",
    description: "...",
    image_url:
      "https://i.pinimg.com/736x/a2/62/77/a262776412f1709424e83c748259461f.jpg",
    total_time: 15,
    servings: 2,
    difficulty: "Mudah",
    username: "sari_masak",
    user_fullname: "Sari (Contoh)",
    avatar_url: "https://ui-avatars.com/api/?name=Sari+Masak&background=random",
    like_count: 8100,
    comment_count: 10,
    ingredients: [
      "2 potong ayam goreng (tepung)",
      "10 buah cabai rawit merah",
      "5 siung bawang merah",
    ],
    steps: ["Ulek kasar cabai dan bawang.", "Iris tipis sereh, campurkan."],
  };
  const dummyComments = [
    {
      id: 1,
      name: "Budi Santoso",
      username: "budi_rendang",
      text: "Wah, keliatannya pedes banget! Jadi lapar!",
      time: "2 jam lalu",
    },
    {
      id: 2,
      name: "Chef Yuni",
      username: "chef_yuni",
      text: "Tips: minyaknya harus beneran panas biar wangi serehnya keluar. Mantap resepnya!",
      time: "1 jam lalu",
    },
  ];

  // --- STATE INTERAKSI (Akan diisi dari API) ---
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(MOCK_RECIPE.like_count);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // --- FETCH COMMENTS FUNCTION ---
  const fetchComments = async () => {
    try {
      // PANGGIL API UNTUK AMBIL KOMENTAR
      const commentsRes = await api.get(`/recipes/${id}/comments`);
      setComments(commentsRes.data.comments || dummyComments);
    } catch (error) {
      setComments(dummyComments); // Fallback to mock comments
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const apiRecipe = response.data;
        setRecipe(apiRecipe);

        setIsLiked(apiRecipe.is_liked || false);
        setLikeCount(apiRecipe.like_count || apiRecipe.likes || 0);
        setIsSaved(apiRecipe.is_saved || false);
        setIsFollowing(apiRecipe.is_following || false);
      } catch (error) {
        setRecipe(MOCK_RECIPE);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipe();
    fetchComments(); // Panggil fetch comments saat halaman dimuat
  }, [id, authToken]);

  // --- HANDLER SUBMIT KOMENTAR (API) ---
  const handleSubmitComment = async () => {
    if (!authToken) {
      alert("Anda harus login untuk berkomentar.");
      return;
    }
    setIsSubmitting(true);

    try {
      const payload = { text: commentInput };

      // 1. PANGGIL API POST KOMENTAR
      await api.post(`/recipes/${id}/comments`, payload, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // 2. Fetch ulang komentar atau update state secara lokal
      // Untuk pengalaman yang lebih baik, kita update lokal dulu
      const newComment = {
        id: Date.now(),
        name: "Anda",
        username: "user_anda", // Ganti dengan username user yang sebenarnya
        text: commentInput,
        time: "Baru saja",
      };

      setComments((prev) => [newComment, ...prev]);
      setCommentInput(""); // Kosongkan input
      alert("Komentar berhasil dikirim!");
    } catch (error) {
      console.error("Submit Comment Error:", error.response || error);
      alert("Gagal mengirim komentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- HANDLER FUNCTIONS (LOGIKA API UNTUK INTERAKSI) ---
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
    const endpoint = isLiked ? `/recipes/${id}/unlike` : `/recipes/${id}/like`;
    handleAction(endpoint, "Suka/Tidak Suka", () => {
      setIsLiked(!isLiked);
      setLikeCount((prev) => prev + (isLiked ? -1 : 1));
    });
  };
  const handleSave = () => {
    const endpoint = isSaved ? `/recipes/${id}/unsave` : `/recipes/${id}/save`;
    handleAction(endpoint, "Simpan/Batal Simpan", () => {
      setIsSaved(!isSaved);
    });
  };

  const handleShare = () => {
    alert("Link berhasil disalin! (API Share/Salin)");
  };

  const handleFollow = () => {
    const endpoint = isFollowing
      ? `/users/${recipe.username}/unfollow`
      : `/users/${recipe.username}/follow`;
    handleAction(endpoint, "Ikuti/Berhenti Ikuti", () => {
      setIsFollowing(!isFollowing);
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  if (isLoading || !recipe) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px", flexGrow: 1 }}>
        Memuat Detail Resep...
      </div>
    );
  }

  // Setelah data dimuat
  const displayRecipe = recipe;

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
              <h1 className="recipe-detail-title">{displayRecipe.title}</h1>
            </div>

            <div className="post-header revised">
              <div
                className="profile-pic-small"
                style={{ backgroundImage: `url(${displayRecipe.avatar_url})` }}
              ></div>
              <div className="user-details-column">
                <div className="user-details-top">
                  <strong>{displayRecipe.user_fullname}</strong>
                  <span className="username">@{displayRecipe.username}</span>
                  <span className="dot-separator">•</span>
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
            src={displayRecipe.image_url || displayRecipe.image}
            alt={displayRecipe.title}
            className="recipe-hero-image"
          />

          {/* ACTIONS BAR */}
          <div className="post-actions detail-page-actions">
            {/* LIKE BUTTON */}
            <button
              onClick={handleLike}
              className={isLiked ? "like-active" : ""}
            >
              <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i>
              {formatNumber(likeCount)} Suka
            </button>

            {/* COMMENT BUTTON */}
            <a
              href="#comments-section"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <i className="far fa-comment"></i> {comments.length} Komentar
            </a>

            {/* SHARE BUTTON */}
            <button onClick={handleShare}>
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
            comments={comments}
            commentCount={comments.length}
            onCommentSubmit={handleSubmitComment} // Pass handler
            commentInput={commentInput} // Pass input value
            setCommentInput={setCommentInput} // Pass setter
            isLoading={isSubmitting} // Pass loading state
          />
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;
