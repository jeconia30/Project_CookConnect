import React, { useState, useEffect } from 'react'; 
import RecipeCardFeed from '../components/RecipeCardFeed';
import api from '../api/axiosInstance';
import { initialRecipesData } from '../data/recipes';

const FeedPage = () => {
  const [feedRecipes, setFeedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        // PANGGIL API GET FEED
        const response = await api.get('/recipes', {
             headers: { Authorization: `Bearer ${authToken}` }
        });
        
        // Asumsi API mengembalikan array of recipes (response.data.recipes atau response.data)
        setFeedRecipes(response.data.recipes || response.data); 
        
      } catch (err) {
        console.error("Fetch Feed Error:", err.response || err);
        setError("Gagal mengambil data Feed. Menampilkan data mock.");
        
        // FALLBACK KE MOCK DATA LAMA JIKA GAGAL
        setFeedRecipes(initialRecipesData);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, [authToken]); // Run sekali saat mount

  return (
    <div className="feed-area">
      {isLoading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Memuat Feed...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      {!isLoading && feedRecipes.length === 0 && !error && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Belum ada resep di Feed.</p>
      )}

      {feedRecipes.map((recipe) => (
        <RecipeCardFeed key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default FeedPage;