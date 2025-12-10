import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axiosInstance";
import RecipeCardFeed from "../components/RecipeCardFeed";
import UserSearchCard from "../components/UserSearchCard";

const FeedPage = () => {
  const [feedRecipes, setFeedRecipes] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
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
      setFoundUsers([]);
      setFeedRecipes([]);

      try {
        if (query) {
          const [recipesRes, usersRes] = await Promise.all([
            api.get(`/recipes/search?q=${query}`, {
              headers: { Authorization: `Bearer ${authToken}` },
            }),
            api.get(`/users?search=${query}`, {
              headers: { Authorization: `Bearer ${authToken}` },
            }),
          ]);

          const recipesData =
            recipesRes.data?.data?.recipes || recipesRes.data?.recipes || [];
          setFeedRecipes(recipesData);
          setFoundUsers(usersRes.data.users || []);
        } else {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, authToken]);

  return (
    <div className="feed-area" style={{ flexGrow: 1, maxWidth: "700px" }}>
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

      {!isLoading && query && foundUsers.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "10px", color: "#555", borderBottom: "2px solid #38761d", display: "inline-block", paddingBottom: "3px" }}>
            Pengguna
          </h3>
          <div className="user-results-list">
            {foundUsers.map((user) => (
              <UserSearchCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}

      {!isLoading && (
        <div>
          {query && feedRecipes.length > 0 && (
            <h3 style={{ fontSize: "1.1rem", marginBottom: "15px", color: "#555", borderBottom: "2px solid #38761d", display: "inline-block", paddingBottom: "3px" }}>
              Resep
            </h3>
          )}

          {feedRecipes.length > 0
            ? feedRecipes.map((recipe) => (
                <RecipeCardFeed key={recipe.id} recipe={recipe} />
              ))
            : 
              !isLoading && !error && foundUsers.length === 0 && (
                <div style={{ textAlign: "center", marginTop: "40px", color: "#888" }}>
                  <i className="fas fa-utensils" style={{ fontSize: "2rem", marginBottom: "10px", display: "block" }}></i>
                  <p>
                    {query ? `Tidak ditemukan resep untuk "${query}"` : "Belum ada postingan resep."}
                  </p>
                </div>
              )}
        </div>
      )}
    </div>
  );
};

export default FeedPage;