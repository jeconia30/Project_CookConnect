import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import CommentsSection from "../components/CommentsSection";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ State untuk Error
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authToken = localStorage.getItem("authToken");

  // --- STATE INTERAKSI ---
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // --- FETCH COMMENTS ---
  const fetchComments = async () => {
    try {
      const commentsRes = await api.get(`/comments/recipe/${id}`);
      setComments(commentsRes.data.comments || []);
    } catch (error) {
      console.error("Gagal ambil komentar:", error);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/recipes/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const apiRecipe = response.data?.data || response.data;
        setRecipe(apiRecipe);

        setIsLiked(apiRecipe.is_liked || false);
        setLikeCount(apiRecipe.like_count || apiRecipe.likes || 0);
        setIsSaved(apiRecipe.is_saved || false);
        setIsFollowing(apiRecipe.is_following || false);

        // Ambil komentar setelah resep berhasil dimuat
        fetchComments();
      } catch (err) {
        console.error("Error loading recipe:", err);
        // ✅ JANGAN TAMPILKAN MOCK DATA, TAPI SET ERROR
        setError("Resep tidak ditemukan atau telah dihapus.");
        setRecipe(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id, authToken]);

  // --- HANDLER FUNCTIONS ---
  const handleSubmitComment = async () => {
    if (!authToken) return alert("Login dulu!");
    setIsSubmitting(true);
    try {
      await api.post(
        `/comments`,
        { recipe_id: id, content: commentInput },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      // Refresh komentar / tambah manual
      const userProfile = JSON.parse(localStorage.getItem("userProfileData"));
      const newComment = {
        id: Date.now(),
        name: userProfile?.full_name || "Anda",
        username: userProfile?.username || "user",
        avatar: userProfile?.avatar_url,
        text: commentInput,
        time: "Baru saja",
      };
      setComments((prev) => [newComment, ...prev]);
      setCommentInput("");
      alert("Komentar berhasil dikirim!");
    } catch (error) {
      alert("Gagal mengirim komentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAction = async (endpoint, actionName, successCallback) => {
    if (!authToken) return alert("Anda harus login.");
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
    handleAction(endpoint, "Like", () => {
      setIsLiked(!isLiked);
      setLikeCount((prev) => prev + (isLiked ? -1 : 1));
    });
  };

  const handleSave = () => {
    const endpoint = isSaved ? `/recipes/${id}/unsave` : `/recipes/${id}/save`;
    handleAction(endpoint, "Simpan", () => setIsSaved(!isSaved));
  };

  const handleFollow = () => {
    if (!recipe) return;
    const endpoint = isFollowing
      ? `/users/${recipe.username}/unfollow`
      : `/users/${recipe.username}/follow`;
    handleAction(endpoint, "Follow", () => setIsFollowing(!isFollowing));
  };

  const handleShare = () => alert("Link berhasil disalin!");

  const formatNumber = (num) =>
    num >= 1000 ? (num / 1000).toFixed(1).replace(/\.0$/, "") + "K" : num;

  // --- RENDER LOADING / ERROR ---
  if (isLoading)
    return (
      <div
        className="feed-area"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        Memuat...
      </div>
    );

  // ✅ TAMPILAN JIKA RESEP HILANG/ERROR
  if (error || !recipe) {
    return (
      <div
        className="feed-area"
        style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}
      >
        <h2>🚫 Oops!</h2>
        <p>{error || "Resep tidak ditemukan."}</p>
        <button
          className="cta-button"
          onClick={() => navigate("/feed")}
          style={{ marginTop: "20px" }}
        >
          Kembali ke Feed
        </button>
      </div>
    );
  }

  // --- RENDER UI UTAMA ---
  return (
    <div className="loggedin-body">
      <main
        className="feed-container container"
        style={{ display: "flex", gap: "20px", marginTop: "20px" }}
      >
        <div className="recipe-detail-container">
          {/* Header */}
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
                  <button
                    className="follow-button text-only"
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Mengikuti" : "Ikuti"}
                  </button>
                </div>
                <span className="post-meta">
                  {new Date(recipe.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="recipe-hero-image"
          />

          {/* Actions */}
          <div className="post-actions detail-page-actions">
            <button
              onClick={handleLike}
              className={isLiked ? "like-active" : ""}
            >
              <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i>{" "}
              {formatNumber(likeCount)} Suka
            </button>
            <a
              href="#comments-section"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <i className="far fa-comment"></i> {comments.length} Komentar
            </a>
            <button onClick={handleShare}>
              <i className="far fa-share-square"></i> Bagikan
            </button>
            <button
              onClick={handleSave}
              className={isSaved ? "save-active" : ""}
            >
              <i
                className={isSaved ? "fas fa-bookmark" : "far fa-bookmark"}
              ></i>{" "}
              {isSaved ? "Disimpan" : "Simpan"}
            </button>
          </div>

          <div className="recipe-caption-full">
            <p>{recipe.description}</p>
          </div>

          {/* Stats */}
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

          {/* Bahan & Langkah */}
          <div className="recipe-main-content-wrapper">
            <div className="recipe-ingredients">
              <h3>
                <i className="fas fa-shopping-cart"></i> Bahan-Bahan
              </h3>
              <ul>
                {recipe.ingredients?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="recipe-instructions">
              <h3>
                <i className="fas fa-list-ol"></i> Langkah-Langkah
              </h3>
              <ol>
                {recipe.steps?.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <CommentsSection
            comments={comments}
            commentCount={comments.length}
            onCommentSubmit={handleSubmitComment}
            commentInput={commentInput}
            setCommentInput={setCommentInput}
            isLoading={isSubmitting}
          />
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;
