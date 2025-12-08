import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserSearchCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="user-search-card" 
      onClick={() => navigate(`/profile/${user.username}`)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #eee',
        marginBottom: '10px',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <img 
        src={user.avatar_url || 'https://placehold.co/100'} 
        alt={user.username} 
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #f0f0f0'
        }}
      />
      
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: '#333' }}>{user.full_name}</h4>
        <span style={{ fontSize: '0.85rem', color: '#777' }}>@{user.username}</span>
      </div>

      <button 
        style={{
          background: 'transparent',
          border: '1px solid #38761d',
          color: '#38761d',
          padding: '5px 15px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Lihat
      </button>
    </div>
  );
};

export default UserSearchCard;