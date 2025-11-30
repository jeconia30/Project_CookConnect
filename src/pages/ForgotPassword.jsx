import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

   const handleSubmit = (e) => {
     e.preventDefault();
     alert(`Link reset telah dikirim ke: ${email}!`);
     navigate('/reset-password');
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
         <h2>Lupa Password Anda?</h2>

         <p className="auth-instruction">
           Jangan khawatir. Masukkan email Anda yang terdaftar dan kami akan mengirimkan link untuk mereset password Anda.
         </p>

           <div className="form-group">
             <label htmlFor="forgot-email">Email</label>
             <input 
              type="email" 
              id="forgot-email" 
              value={email}
              onChange={handleEmailChange} 
              required 
            />
          </div>

          <button type="submit" className="cta-button auth-button">
            Kirim Link Reset
          </button>

          <p className="auth-toggle">
            Ingat password Anda?{' '}
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

export default ForgotPassword;