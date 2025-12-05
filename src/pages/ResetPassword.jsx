import React, { useState } from 'react';
// Anda harus memastikan path impor ini benar sesuai lokasi file CSS
import './ResetPassword.css'; 
// Import useNavigate jika Anda menggunakan React Router DOM
import { useNavigate } from 'react-router-dom'; 

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Password baru dan konfirmasi password tidak cocok! Silakan coba lagi.');
      return;
    }

    alert('Password berhasil direset! Anda akan diarahkan ke halaman Login.');
    
    navigate('/login'); 
  };

  return (
    <div className="login-page-body">
      <header className="login-header">
        <div className="container">
          <a href="/" className="logo-link">
            <div className="logo">CookConnect</div>
          </a>
        </div>
      </header>

      <div className="login-container">
        <form id="reset-form" className="auth-form" onSubmit={handleSubmit}>
          <div className="logo-auth">CookConnect</div>
          <h2>Reset Password Anda</h2>
          <p className="auth-instruction">
            Masukkan password baru Anda. Pastikan password kuat.
          </p>
          
          <div className="form-group">
            <label htmlFor="new-password">Password Baru</label>
            <div className="password-wrapper">
              <input 
                type="password" 
                id="new-password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required 
              />
              <i className="fas fa-eye-slash password-toggle-icon" id="toggle-new-pass"></i>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirm-password">Konfirmasi Password Baru</label>
            <div className="password-wrapper">
              <input 
                type="password" 
                id="confirm-password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
              <i className="fas fa-eye-slash password-toggle-icon" id="toggle-confirm-pass"></i>
            </div>
          </div>
          
          <button type="submit" className="cta-button auth-button">
            Simpan Password Baru
          </button>
          
          <p className="auth-toggle">
            <a href="/login">Kembali ke Login</a>
          </p>
        </form>
      </div>

      <footer>
        <p>&copy; 2025 CookConnect. Developed for Web Programming Class.</p>
      </footer>
    </div>
  );
};

export default ResetPassword;