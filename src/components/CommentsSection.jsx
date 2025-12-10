// src/components/CommentsSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/CommentsSection.css';

const CommentsSection = ({ 
    comments, 
    commentCount, 
    onCommentSubmit, 
    commentInput, 
    setCommentInput,
    isLoading,
    currentUserAvatar // 1. TANGKAP PROPS BARU DI SINI
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() !== '' && onCommentSubmit) {
      onCommentSubmit();
    }
  };

  return (
    <div className="comments-section" id="comments-section">
      <div className="comments-header">
        <i className="fas fa-comments"></i> {commentCount || comments.length} Komentar
      </div>

      {/* FORM SUBMISSION */}
      <form className="comment-form" onSubmit={handleSubmit}>
        
        {/* 2. UPDATE BAGIAN INI AGAR FOTO MUNCUL */}
        <div className="comment-avatar"
             style={{ backgroundImage: `url(${currentUserAvatar})` }}>
        </div> 
        
        <div className="comment-input-wrapper">
           <textarea 
              className="comment-input" 
              placeholder="Tulis komentar Anda..." 
              rows="2"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              disabled={isLoading}
           ></textarea>
        </div>
        <button type="submit" className="btn-send-comment" disabled={isLoading || commentInput.trim() === ''}>
          {isLoading ? 'Mengirim...' : 'Kirim'}
        </button>
      </form>

      <div className="comment-list">
        {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div className="comment-item" key={comment.id || index}>
                <Link to={`/profile/${comment.username}`}>
                  <div className="comment-avatar" 
                       style={{ backgroundImage: `url(${comment.avatar || 'https://placehold.co/40'})` }}>
                  </div> 
                </Link>
                
                <div className="comment-content">
                  <div className="comment-author-row">
                    <Link to={`/profile/${comment.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <span className="comment-name">{comment.name || comment.username}</span>
                    </Link>
                    <span className="comment-username">@{comment.username}</span>
                  </div>
                  
                  <p className="comment-text">{comment.text}</p>
                  <span className="comment-time">{comment.time || 'Baru saja'}</span>
                </div>
              </div>
            ))
        ) : (
            <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>Belum ada komentar.</p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;