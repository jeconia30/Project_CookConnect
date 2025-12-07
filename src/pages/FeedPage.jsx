import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import api from "../api/axiosInstance";
import { initialRecipesData } from "../data/recipes";
import RecipeCardFeed from "../components/RecipeCardFeed";

const FeedPage = () => {
  const [feedRecipes, setFeedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken");

  const location = useLocation(); // Hook untuk info URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q"); // Ambil 'q' parameter

  useEffect(() => {
    const fetchFeed = async () => {
      setIsLoading(true);
      setError(null);

      // Tentukan endpoint: Feed utama atau Search
      const endpoint = query ? `/recipes/search?q=${query}` : "/recipes";

      try {
        const response = await api.get(endpoint, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const recipesData =
          response.data?.data?.recipes || response.data?.recipes || [];

        setFeedRecipes(recipesData);
      } catch (err) {
        console.error("Fetch Feed Error:", err.response || err);
        setError(`Gagal mengambil data. Menampilkan data mock.`);

        // Fallback ke data mock
        if (query) {
          const filteredMock = initialRecipesData.filter(
            (r) =>
              r.title.toLowerCase().includes(query.toLowerCase()) ||
              r.description.toLowerCase().includes(query.toLowerCase())
          );
          setFeedRecipes(filteredMock);
        } else {
          setFeedRecipes(initialRecipesData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, [query, authToken]);

  return (
    <div className="feed-area">
      {query && (
        <h2 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>
          Hasil Pencarian untuk: <strong>"{query}"</strong>
        </h2>
      )}

      {isLoading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Memuat {query ? "Pencarian" : "Feed"}...
        </p>
      )}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {!isLoading && feedRecipes.length === 0 && !error && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Tidak ada resep yang ditemukan{" "}
          {query ? `untuk "${query}"` : "di Feed utama."}
        </p>
      )}

      {/* Sekarang aman karena feedRecipes pasti array */}
      {Array.isArray(feedRecipes) &&
        feedRecipes.map((recipe) => (
          <RecipeCardFeed key={recipe.id} recipe={recipe} />
        ))}
    </div>
  );
};

export default FeedPage;
