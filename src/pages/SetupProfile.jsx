import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/app.css';

// Hapus import yang tidak perlu (mocked backend)
// import api from '../api/axiosInstance'; 
// import { supabase } from '../utils/supabaseClient'; 

const SetupProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    username: '', 
    pronouns: '', 
    bio: '',
    link_tiktok: '',
    link_instagram: '',
    link_linkedin: '',
    link_other: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Buat Objek Profil Sesuai Format yang disimpan di LocalStorage
      const initialProfileData = {
        name: formData.full_name || formData.username, 
        username: formData.username, 
        bio: formData.bio,
        // Gunakan imagePreview (Blob URL) atau avatar placeholder
        photo: imagePreview || 'https://ui-avatars.com/api/?name=' + (formData.full_name || formData.username) + '&background=random',
        pronouns: formData.pronouns,
        tiktok: formData.link_tiktok,
        instagram: formData.link_instagram,
        linkedin: formData.link_linkedin,
        website: formData.link_other
      };
      
      // 2. Simpan ke LocalStorage
      localStorage.setItem('userProfileData', JSON.stringify(initialProfileData));

      alert('Setup Profil berhasil! Anda akan diarahkan ke Feed.');
      navigate('/feed'); 

    } catch (error) {
      console.error('Error:', error);
      alert('Gagal setup profil. Cek console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-body">
      <header className="login-header">
        <div className="container">
          <Link to="/" className="logo-link">
            <div className="logo" style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#38761d'}}>CookConnect</div>
          </Link>
        </div>
      </header>

      <div className="login-container profile-setup-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <form id="setup-form" className="auth-form" onSubmit={handleSubmit}>
          <h2 className="profile-setup-title">Lengkapi Profil Anda</h2>

          <div className="profile-pic-upload-area">
            <div className={`profile-pic-large ${!imagePreview ? 'profile-placeholder' : ''}`}>
              {imagePreview && <img src={imagePreview} alt="Preview" />}
            </div>
            <label htmlFor="profile-pic" className="change-pic-button">
              <i className="fas fa-camera"></i> Ubah Foto Profil
              <input type="file" id="profile-pic" accept="image/*" className="hidden-file-input" onChange={handleImageChange} />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="full_name">Nama</label>
            <input type="text" id="full_name" placeholder="Nama Lengkap Anda" value={formData.full_name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input type="text" id="username" placeholder="cth: chefbudi_123" required value={formData.username} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="pronouns">Kata Ganti</label>
            <input type="text" id="pronouns" placeholder="cth: dia/mereka" value={formData.pronouns} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio Singkat</label>
            <textarea id="bio" rows="3" placeholder="Ceritakan sedikit tentang diri Anda..." value={formData.bio} onChange={handleChange}></textarea>
          </div>

          <div className="form-group social-links-group">
            <label>Tambahkan Tautan (Opsional)</label>

            <div className="social-input-wrapper">
              <i className="fab fa-tiktok"></i>
              <input type="url" id="link_tiktok" placeholder="Link profil TikTok Anda" value={formData.link_tiktok} onChange={handleChange} />
            </div>

            <div className="social-input-wrapper">
              <i className="fab fa-instagram"></i>
              <input type="url" id="link_instagram" placeholder="Link profil Instagram Anda" value={formData.link_instagram} onChange={handleChange} />
            </div>

            <div className="social-input-wrapper">
              <i className="fab fa-linkedin"></i>
              <input type="url" id="link_linkedin" placeholder="Link profil LinkedIn Anda" value={formData.link_linkedin} onChange={handleChange} />
            </div>

            <div className="social-input-wrapper">
              <i className="fas fa-link"></i>
              <input type="url" id="link_other" placeholder="Link lainnya" value={formData.link_other} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="cta-button auth-button" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Profil & Mulai'}
          </button>
        </form>
      </div>

      <footer style={{textAlign: 'center', marginTop: '30px', color: '#666'}}>
        <p>&copy; 2025 CookConnect.</p>
      </footer>
    </div>
  );
};

export default SetupProfile;