// src/components/CommentsSection.jsx

import React from 'react';
import '../styles/components/CommentsSection.css';

const CommentsSection = ({ 
    comments, 
    commentCount, 
    onCommentSubmit, 
    commentInput, 
    setCommentInput,
    isLoading 
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

      {/* FORM SUBMISSION BARU */}
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="comment-avatar"></div> 
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
                <div className="comment-avatar" 
                     style={{ backgroundImage: `url(${comment.avatar || 'https://placehold.co/40'})` }}>
                </div> 
                
                <div className="comment-content">
                  <div className="comment-author-row">
                    <span className="comment-name">{comment.name || comment.username}</span>
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