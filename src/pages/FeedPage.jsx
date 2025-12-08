import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axiosInstance";
import RecipeCardFeed from "../components/RecipeCardFeed";
import UserSearchCard from "../components/UserSearchCard"; // ✅ Pastikan file ini dibuat

const FeedPage = () => {
  const [feedRecipes, setFeedRecipes] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]); // ✅ State untuk hasil user
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setFoundUsers([]); // Reset dulu
      setFeedRecipes([]);

      try {
        if (query) {
          // --- MODE PENCARIAN (Parallel Request: Cari User & Resep) ---
          const [recipesRes, usersRes] = await Promise.all([
            api.get(`/recipes/search?q=${query}`, {
              headers: { Authorization: `Bearer ${authToken}` },
            }),
            api.get(`/users?search=${query}`, {
              headers: { Authorization: `Bearer ${authToken}` },
            }),
          ]);

          // Ambil data resep (handle struktur response yang mungkin beda)
          const recipesData =
            recipesRes.data?.data?.recipes || recipesRes.data?.recipes || [];
          setFeedRecipes(recipesData);

          // Ambil data user
          setFoundUsers(usersRes.data.users || []);
        } else {
          // --- MODE FEED BIASA (Hanya Resep) ---
          const response = await api.get("/recipes", {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          const recipesData =
            response.data?.data?.recipes || response.data?.recipes || [];
          setFeedRecipes(recipesData);
        }
      } catch (err) {
        console.error("Fetch Data Error:", err.response || err);
        setError("Gagal mengambil data. Silakan coba lagi nanti.");
        // ❌ HAPUS FALLBACK MOCK DATA
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, authToken]);

  return (
    <div className="feed-area" style={{ flexGrow: 1, maxWidth: "700px" }}>
      {/* JUDUL HASIL PENCARIAN */}
      {query && (
        <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#333" }}>
          Hasil Pencarian: <strong>"{query}"</strong>
        </h2>
      )}

      {isLoading && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          <i className="fas fa-spinner fa-spin"></i> Memuat...
        </p>
      )}

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* --- BAGIAN 1: HASIL USER (Hanya muncul jika ada search query) --- */}
      {!isLoading && query && foundUsers.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
              color: "#555",
              borderBottom: "2px solid #38761d",
              display: "inline-block",
              paddingBottom: "3px",
            }}
          >
            Pengguna
          </h3>
          <div className="user-results-list">
            {foundUsers.map((user) => (
              <UserSearchCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}

      {/* --- BAGIAN 2: HASIL RESEP / FEED UTAMA --- */}
      {!isLoading && (
        <div>
          {query && feedRecipes.length > 0 && (
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "15px",
                color: "#555",
                borderBottom: "2px solid #38761d",
                display: "inline-block",
                paddingBottom: "3px",
              }}
            >
              Resep
            </h3>
          )}

          {feedRecipes.length > 0
            ? feedRecipes.map((recipe) => (
                <RecipeCardFeed key={recipe.id} recipe={recipe} />
              ))
            : // Pesan Kosong (Hanya jika Users juga kosong, tidak error, dan tidak loading)
              !isLoading &&
              !error &&
              foundUsers.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "40px",
                    color: "#888",
                  }}
                >
                  <i
                    className="fas fa-search"
                    style={{
                      fontSize: "2rem",
                      marginBottom: "10px",
                      display: "block",
                    }}
                  ></i>
                  <p>
                    Tidak ditemukan Pengguna atau Resep untuk "
                    <strong>{query}</strong>"
                  </p>
                </div>
              )}
        </div>
      )}
    </div>
  );
};

export default FeedPage;
