import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/app.css';
import { SharedFooter } from './LandingPage';
// ✅ IMPORT API DAN POPUP
import api from '../api/axiosInstance';
import { showPopup } from '../utils/swal';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false); // ✅ State loading
  
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => { // ✅ Ubah jadi async
     e.preventDefault();
     
     // Validasi Frontend Sederhana
     if(!formData.name || !formData.username || !formData.email) {
        showPopup("Gagal", "Mohon lengkapi semua data!", "warning");
        return;
     }

     setIsLoading(true); // Mulai Loading

     try {
        // ✅ Panggil API Backend
        const response = await api.post('/auth/verify-user', {
            full_name: formData.name,
            username: formData.username,
            email: formData.email
        });

        // Jika Sukses (Code 200)
        await showPopup("Berhasil!", "Data terverifikasi. Silakan buat password baru.", "success");
        
        // Arahkan ke Reset Password
        // Kita bawa 'email' di state agar nanti pas reset password backend tahu user mana yg direset
        navigate('/reset-password', { state: { email: formData.email } });

     } catch (error) {
        console.error(error);
        // ✅ Tampilkan Pop-up Salah
        const errorMsg = error.response?.data?.message || "Data tidak ditemukan.";
        
        showPopup(
            "Identitas Salah", 
            `${errorMsg} Silakan coba lagi atau hubungi admin.`, 
            "error"
        );
     } finally {
        setIsLoading(false); // Selesai Loading
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
              placeholder="Masukkan nama lengkap sesuai profil"
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
              placeholder="Contoh: user123"
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
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="cta-button auth-button" disabled={isLoading}>
            {isLoading ? "Memeriksa..." : "Verifikasi & Lanjut"}
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