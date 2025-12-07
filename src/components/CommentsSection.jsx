import React from 'react';
import '../styles/components/CommentsSection.css';

const CommentsSection = ({ comments, commentCount }) => {
  return (
    <div className="comments-section" id="comments-section">
      <div className="comments-header">
        <i className="fas fa-comments"></i> {commentCount} Komentar
      </div>

      <div className="comment-form">
        <div className="comment-avatar"></div> 
        <div className="comment-input-wrapper">
           <textarea 
              className="comment-input" 
              placeholder="Tulis komentar Anda..." 
              rows="2"
           ></textarea>
        </div>
        <button className="btn-send-comment">Kirim</button>
      </div>

      <div className="comment-list">
        {comments.map((comment, index) => (
          <div className="comment-item" key={index}>
            <div className="comment-avatar"></div> 
            
            <div className="comment-content">
              {/* BAGIAN INI KITA UBAH BIAR ADA NAMA & USERNAME */}
              <div className="comment-author-row">
                <span className="comment-name">{comment.name}</span>
                <span className="comment-username">{comment.username}</span>
              </div>
              
              <p className="comment-text">{comment.text}</p>
              <span className="comment-time">{comment.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;