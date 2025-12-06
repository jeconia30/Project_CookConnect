import React from 'react';
import { useNavigate } from 'react-router-dom';
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
              <img src={item.img} alt={item.name} className="trending-img" />
              <div className="trending-info">
                <span className="trending-name">{item.name}</span>
                <span className="trending-likes">❤️ {item.likes}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;