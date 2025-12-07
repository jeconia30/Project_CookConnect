import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance'; // ✅ Import API
import '../styles/components/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate(); 
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch Data Trending saat komponen dimuat
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // Panggil endpoint getRecipes dengan parameter sort=trending
        const response = await api.get('/recipes?sort=trending');
        
        // Ambil data (handle wrapper response backend)
        const allRecipes = response.data?.data?.recipes || response.data?.recipes || [];
        
        // Ambil 5 teratas saja
        setTrendingRecipes(allRecipes.slice(0, 5));
      } catch (error) {
        console.error("Gagal mengambil resep viral:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <aside className="sidebar-content">
      <button 
        className="btn-create"
        onClick={() => navigate('/create')} 
      >
        <span className="plus-icon">+</span> Buat Resep Baru
      </button>

      <div className="trending-box">
        <h3>🔥 Resep Viral!</h3>
        
        {isLoading ? (
          <p style={{textAlign: 'center', fontSize: '0.9rem', color: '#888'}}>Memuat...</p>
        ) : (
          <ul className="trending-list">
            {trendingRecipes.length > 0 ? (
              trendingRecipes.map((item) => (
                <li key={item.id} className="trending-item">
                  <Link 
                    to={`/recipe/${item.id}`} 
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit', width: '100%' }}
                  >
                    <img 
                      src={item.image || item.image_url || "https://placehold.co/100"} 
                      alt={item.title} 
                      className="trending-img" 
                    />
                    <div className="trending-info">
                      {/* Gunakan substring agar judul tidak kepanjangan di sidebar */}
                      <span className="trending-name">
                        {item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}
                      </span>
                      <span className="trending-likes">❤️ {item.likes || item.like_count} Suka</span>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p style={{fontSize: '0.85rem', color: '#999', textAlign: 'center'}}>Belum ada resep viral.</p>
            )}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;