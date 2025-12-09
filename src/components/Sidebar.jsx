import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import '../styles/components/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate(); 
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // Panggil API resep dengan parameter sort=trending
        const response = await api.get('/recipes?sort=trending');
        
        // Ambil datanya
        const allRecipes = response.data?.data?.recipes || response.data?.recipes || [];
        
        // Ambil 5 teratas saja
        setTrendingRecipes(allRecipes.slice(0, 5));
      } catch (error) {
        console.error("Gagal memuat trending:", error);
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
          <p style={{ fontSize: '0.9rem', color: '#888' }}>Memuat...</p>
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
                      src={item.image_url || 'https://placehold.co/50'} 
                      alt={item.title} 
                      className="trending-img" 
                    />
                    <div className="trending-info">
                      {/* Batasi judul agar tidak kepanjangan */}
                      <span className="trending-name">
                        {item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}
                      </span>
                      <span className="trending-likes">❤️ {item.like_count || 0}</span>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p style={{ fontSize: '0.9rem', color: '#888' }}>Belum ada resep viral.</p>
            )}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;