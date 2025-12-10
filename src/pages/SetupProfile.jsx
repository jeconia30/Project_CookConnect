import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { uploadProfileAvatar } from "../services/uploadService";
import "../styles/app.css";

const SetupProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("authToken");

  const getUserIdFromToken = () => {
    if (!authToken) return null;
    try {
      const decoded = JSON.parse(atob(authToken.split('.')[1]));
      return decoded.id;
    } catch {
      return null;
    }
  };

  const userId = getUserIdFromToken();

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    pronouns: "",
    bio: "",
    link_tiktok: "",
    link_instagram: "",
    link_linkedin: "",
    link_other: "",
    avatar_url: null, // Tambahkan state untuk URL avatar
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      
      setUploadingImage(true);
      try {
        const result = await uploadProfileAvatar(file, userId);
        // Simpan URL hasil upload ke state formData
        setFormData(prev => ({ ...prev, avatar_url: result.url }));
        console.log('Avatar uploaded:', result.url);
      } catch (error) {
        alert('Gagal upload avatar: ' + error.message);
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 1. Siapkan Payload
    const payload = {
      full_name: formData.full_name,
      username: formData.username,
      bio: formData.bio,
      pronouns: formData.pronouns,
      link_tiktok: formData.link_tiktok,
      link_instagram: formData.link_instagram,
      link_linkedin: formData.link_linkedin,
      link_other: formData.link_other,
      // Pastikan ini mengambil dari state yang sudah di-set saat upload gambar
      avatar_url: formData.avatar_url, 
    };

    console.log("Mengirim data update:", payload); // Cek di console

    // 2. Kirim ke Backend
    await api.put(`/users/me/profile`, payload, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    // 3. [PERBAIKAN UTAMA] Update LocalStorage Secara Manual & Paksa
    // Kita ambil data lama, lalu timpa dengan data baru dari form
    const oldStorage = JSON.parse(localStorage.getItem('userProfileData') || '{}');
    
    const newStorage = { 
        ...oldStorage, 
        ...payload, // Timpa data lama dengan data form terbaru
        // Pastikan key 'photo' dan 'avatar_url' terisi agar Navbar bisa baca
        photo: payload.avatar_url, 
        avatar_url: payload.avatar_url 
    };
    
    console.log("Menyimpan ke LocalStorage:", newStorage); // Cek di console
    localStorage.setItem('userProfileData', JSON.stringify(newStorage));

    alert("Setup Profil berhasil!");
    
    // 4. Redirect dengan reload agar Navbar memuat ulang data
    window.location.href = "/feed"; 

  } catch (error) {
    console.error("Error:", error.response || error);
    alert("Gagal setup profil: " + (error.response?.data?.error || error.message));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page-body">
      <header className="login-header">
        <div className="container">
          <Link to="/" className="logo-link">
            <div className="logo">CookConnect</div>
          </Link>
        </div>
      </header>

      <div className="login-container profile-setup-container">
        {/* Tombol Back */}
        <button className="back-button" onClick={() => navigate(-1)} type="button">
          <i className="fas fa-arrow-left"></i>
        </button>

        <form id="setup-form" className="auth-form" onSubmit={handleSubmit}>
          <h2 className="profile-setup-title">Lengkapi Profil Anda</h2>

          <div className="profile-pic-upload-area">
            <div
              className={`profile-pic-large ${!imagePreview ? "profile-placeholder" : ""}`}
            >
              {imagePreview && <img src={imagePreview} alt="Preview" />}
            </div>
            <label htmlFor="profile-pic" className="change-pic-button">
              <i className="fas fa-camera"></i> {uploadingImage ? 'Mengupload...' : 'Ubah Foto Profil'}
              <input
                type="file"
                id="profile-pic"
                accept="image/*"
                className="hidden-file-input"
                onChange={handleImageChange}
                disabled={uploadingImage}
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="full_name">Nama</label>
            <input
              type="text"
              id="full_name"
              placeholder="Nama Lengkap Anda"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              placeholder="cth: chefbudi_123"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pronouns">Kata Ganti</label>
            <input
              type="text"
              id="pronouns"
              placeholder="cth: dia/mereka"
              value={formData.pronouns}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio Singkat</label>
            <textarea
              id="bio"
              rows="3"
              placeholder="Ceritakan sedikit tentang diri Anda..."
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Social Links (Opsional) */}
          <div className="form-group social-links-group">
            <label>Tambahkan Tautan (Opsional)</label>
            <div className="social-input-wrapper">
              <i className="fab fa-tiktok"></i>
              <input
                type="url"
                id="link_tiktok"
                placeholder="Link profil TikTok Anda"
                value={formData.link_tiktok}
                onChange={handleChange}
              />
            </div>
            {/* ... tambahkan input social lain jika perlu ... */}
          </div>

          <button
            type="submit"
            className="cta-button auth-button"
            disabled={loading || uploadingImage}
          >
            {loading ? "Menyimpan..." : "Simpan Profil & Mulai"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupProfile;