import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/app.css';
import { SharedFooter } from './LandingPage';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  });
  
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = (e) => {
     e.preventDefault();
     
     if(formData.name && formData.username && formData.email) {
        alert('Data diverifikasi! Silakan buat password baru.');
        navigate('/reset-password');
     } else {
        alert('Mohon lengkapi semua data!');
     }
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
         <form id="forgot-form" className="auth-form" onSubmit={handleSubmit}>
         <div className="logo-auth">CookConnect</div>
         <h2>Lupa Password?</h2>

         <p className="auth-instruction">
           Masukkan data akun Anda untuk memverifikasi identitas.
         </p>

           <div className="form-group">
             <label htmlFor="fp-name">Nama Lengkap</label>
             <input 
              type="text" 
              id="fp-name" 
              name="name"
              value={formData.name}
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
             <label htmlFor="fp-username">Username</label>
             <input 
              type="text" 
              id="fp-username" 
              name="username"
              value={formData.username}
              onChange={handleChange} 
              required 
            />
          </div>

           <div className="form-group">
             <label htmlFor="fp-email">Email</label>
             <input 
              type="email" 
              id="fp-email" 
              name="email"
              value={formData.email}
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="cta-button auth-button">
            Reset Password
          </button>

          <p className="auth-toggle">
            Ingat password Anda?{' '}
            <a href="/login">Kembali ke Login</a> 
          </p>
        </form>
      </div>
      
      <SharedFooter />
    </div>
  );
};

export default ForgotPassword;