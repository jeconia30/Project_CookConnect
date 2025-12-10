import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import CommentsSection from "../components/CommentsSection";
import { showPopup, showToast } from "../utils/swal"; // IMPOR POPUP

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State Data
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);

  // State UI & Loading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data User Login
  const authToken = localStorage.getItem("authToken");
  const currentUserData = JSON.parse(
    localStorage.getItem("userProfileData") || "{}"
  );
  const currentUsername = currentUserData.username;

  // State Interaksi
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // --- FETCH COMMENTS & MAP AVATAR ---
  const fetchComments = async () => {
    try {
      const commentsRes = await api.get(`/comments/recipe/${id}`);
      const rawComments = commentsRes.data.comments || [];

      const mappedComments = rawComments.map((c) => ({
        ...c,
        avatar:
          c.avatar || c.avatar_url || c.photo || "https://placehold.co/50",
        name: c.user_fullname || c.name || "User",
        username: c.username || "user",
      }));

      setComments(mappedComments);
    } catch (error) {
      console.error("Gagal ambil komentar:", error);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const tokenToSend = authToken ? `Bearer ${authToken}` : undefined;
        const response = await api.get(`/recipes/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const apiRecipe = response.data?.data || response.data;
        setRecipe(apiRecipe);

        setIsLiked(apiRecipe.is_liked || false);
        setLikeCount(apiRecipe.like_count || apiRecipe.likes || 0);
        setIsSaved(apiRecipe.is_saved || false);
        setIsFollowing(apiRecipe.is_following || false);

        fetchComments();
      } catch (err) {
        console.error("Error loading recipe:", err);
        setError("Resep tidak ditemukan atau telah dihapus.");
        setRecipe(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id, authToken]);

  useEffect(() => {
    if (!isLoading && location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [isLoading, location.hash]);

  if (isLoading)
    return (
      <div
        className="feed-area"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        Memuat...
      </div>
    );

  // --- HANDLERS ---
  const handleSubmitComment = async () => {
    if (!authToken)
      return showPopup(
        "Login Dulu",
        "Anda harus login untuk berkomentar",
        "warning"
      );
    setIsSubmitting(true);
    try {
      await api.post(
        `/comments`,
        { recipe_id: id, content: commentInput },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const newComment = {
        id: Date.now(),
        name: currentUserData?.full_name || "Anda",
        username: currentUserData?.username || "user",
        avatar:
          currentUserData?.avatar_url ||
          currentUserData?.photo ||
          "https://placehold.co/50",
        text: commentInput,
        time: "Baru saja",
      };
      setComments((prev) => [newComment, ...prev]);
      setCommentInput("");
    } catch (error) {
      showPopup("Gagal", "Gagal mengirim komentar.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAction = async (endpoint, actionName, successCallback) => {
    if (!authToken)
      return showPopup(
        "Akses Ditolak",
        "Anda harus login untuk melakukan aksi ini.",
        "warning"
      );
    try {
      await api.post(
        endpoint,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      successCallback();
    } catch (err) {
      showPopup("Gagal", `Gagal memproses ${actionName}.`, "error");
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
    const targetUser = recipe.username || recipe.author;
    const endpoint = isFollowing
      ? `/users/${targetUser}/unfollow`
      : `/users/${targetUser}/follow`;
    handleAction(endpoint, "Follow", () => setIsFollowing(!isFollowing));
  };

  // PENGGANTI ALERT SHARE
  const handleShare = () => {
    showToast("Link berhasil disalin!", "success");
  };

  const formatNumber = (num) =>
    num >= 1000 ? (num / 1000).toFixed(1).replace(/\.0$/, "") + "K" : num;

  if (isLoading)
    return (
      <div
        className="feed-area"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        Memuat...
      </div>
    );
  if (error || !recipe)
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

  const displayFullname =
    recipe.user_fullname ||
    recipe.full_name ||
    recipe.author_name ||
    "Nama Pengguna";
  const displayUsername = recipe.username || recipe.author || "user";
  const displayAvatar =
    recipe.avatar_url ||
    recipe.avatar ||
    recipe.user_avatar ||
    "https://placehold.co/50";

  const isOwnRecipe =
    currentUsername && displayUsername
      ? currentUsername.trim().toLowerCase() ===
        displayUsername.trim().toLowerCase()
      : false;

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
                style={{ backgroundImage: `url(${displayAvatar})` }}
              ></div>
              <div className="user-details-column">
                <div className="user-details-top">
                  <strong>{displayFullname}</strong>
                  <span className="username">@{displayUsername}</span>
                  {!isOwnRecipe && (
                    <>
                      <span className="dot-separator">•</span>
                      <button
                        className="follow-button text-only"
                        onClick={handleFollow}
                      >
                        {isFollowing ? "Mengikuti" : "Ikuti"}
                      </button>
                    </>
                  )}
                </div>
                <span className="post-meta">
                  {new Date(recipe.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

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
          {(recipe.video_url || recipe.tiktok_url || recipe.instagram_url) && (
            <div
              className="recipe-links-section"
              style={{ marginTop: "30px", marginBottom: "20px" }}
            >
              <h3
                style={{
                  fontSize: "1.1rem",
                  color: "#333",
                  marginBottom: "15px",
                }}
              >
                <i className="fas fa-link"></i> Tonton Tutorial
              </h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {recipe.video_url && (
                  <a
                    href={recipe.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      backgroundColor: "#38761d",
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    <i className="fab fa-youtube"></i> YouTube
                  </a>
                )}

                {recipe.tiktok_url && (
                  <a
                    href={recipe.tiktok_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      backgroundColor: "#38761d",
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    <i className="fab fa-tiktok"></i> TikTok
                  </a>
                )}

                {recipe.instagram_url && (
                  <a
                    href={recipe.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      backgroundColor: "#38761d",
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    <i className="fab fa-instagram"></i> Instagram
                  </a>
                )}
              </div>
            </div>
          )}
          <CommentsSection
            comments={comments}
            commentCount={comments.length}
            onCommentSubmit={handleSubmitComment}
            commentInput={commentInput}
            setCommentInput={setCommentInput}
            isLoading={isSubmitting}
            currentUserAvatar={
              currentUserData?.avatar_url ||
              currentUserData?.photo ||
              "https://placehold.co/50"
            }
          />
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;
