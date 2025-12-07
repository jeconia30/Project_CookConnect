import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 1. Tambah import Link
import { trendingData } from '../data/recipes';
import '../styles/components/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate(); 

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
          {trendingData.map((item) => (
            <li key={item.id} className="trending-item">
              {/* 2. Bungkus item dengan Link ke detail resep */}
              <Link 
                to={`/recipe/${item.id}`} 
                style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit', width: '100%' }}
              >
                <img src={item.img} alt={item.name} className="trending-img" />
                <div className="trending-info">
                  <span className="trending-name">{item.name}</span>
                  <span className="trending-likes">❤️ {item.likes}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;