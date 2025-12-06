import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance'; 
import { supabase } from '../utils/supabaseClient'; 

const SetupProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // --- ⚠️ PENTING: GANTI DENGAN UUID DARI DATABASE SUPABASE KAMU ---
  const userId = '4921d5f3-aa2b-46dc-9c10-da200710e946'; 

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
      let finalAvatarUrl = null;

      // 1. Upload Foto ke Supabase
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
        
        finalAvatarUrl = data.publicUrl;
      }

      // 2. Update Data ke Backend
      const payload = {
        full_name: formData.full_name,
        bio: formData.bio,
        link_tiktok: formData.link_tiktok,
        link_instagram: formData.link_instagram,
        // Kirim link_linkedin & link_other kalau backend sudah support
        avatar_url: finalAvatarUrl
      };

      await api.put(`/users/${userId}`, payload);

      alert('Profil berhasil disimpan!');
      navigate('/feed'); 

    } catch (error) {
      console.error('Error:', error);
      alert('Gagal update profil. Cek console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-body">
      <header className="login-header">
        <div className="container">
          <div className="logo" style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#38761d'}}>CookConnect</div>
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