import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance'; // Import API
import '../styles/components/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate(); 
  const [trendingRecipes, setTrendingRecipes] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // Panggil endpoint getRecipes dengan sort=trending
        const response = await api.get('/recipes?sort=trending');
        // Ambil 5 resep teratas saja
        setTrendingRecipes(response.data.data.recipes.slice(0, 5));
      } catch (error) {
        console.error("Gagal ambil trending:", error);
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
        <ul className="trending-list">
          {trendingRecipes.length > 0 ? (
            trendingRecipes.map((item) => (
              <li key={item.id} className="trending-item">
                <Link 
                  to={`/recipe/${item.id}`} 
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit', width: '100%' }}
                >
                  {/* Gunakan gambar dari API */}
                  <img src={item.image_url} alt={item.title} className="trending-img" />
                  <div className="trending-info">
                    <span className="trending-name">{item.title}</span>
                    <span className="trending-likes">❤️ {item.likes}</span>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p style={{fontSize: '12px', color: '#666'}}>Belum ada resep trending.</p>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;