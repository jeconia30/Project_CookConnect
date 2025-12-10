import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { uploadProfileAvatar } from "../services/uploadService";
import "../styles/app.css";

const SetupProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("authToken");

  // Decode token untuk ambil userId
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
    // pronouns dihapus
    bio: "",
    link_tiktok: "",
    link_instagram: "",
    link_linkedin: "",
    link_other: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      
      setUploadingImage(true);
      try {
        const result = await uploadProfileAvatar(file, userId);
        formData.avatar_url = result.url;
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
      const payload = {
        full_name: formData.full_name,
        username: formData.username,
        bio: formData.bio,
        // pronouns dihapus dari payload
        pronouns: "", 
        link_tiktok: formData.link_tiktok,
        link_instagram: formData.link_instagram,
        link_linkedin: formData.link_linkedin,
        link_other: formData.link_other,
        avatar_url: formData.avatar_url || null,
      };

      await api.put(`/users/me/profile`, payload, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      alert("Setup Profil berhasil!");
      navigate("/feed");
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
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <form id="setup-form" className="auth-form" onSubmit={handleSubmit}>
          <h2 className="profile-setup-title">Lengkapi Profil Anda</h2>

          <div className="profile-pic-upload-area">
            <div
              className={`profile-pic-large ${
                !imagePreview ? "profile-placeholder" : ""
              }`}
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

          {/* Input Pronouns DIHAPUS */}

          <div className="form-group">
            <label htmlFor="bio">Bio Singkat</label>
            {/* Mengubah Textarea menjadi Input Text */}
            <input
              type="text"
              id="bio"
              placeholder="Ceritakan sedikit tentang diri Anda..."
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

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

            <div className="social-input-wrapper">
              <i className="fab fa-instagram"></i>
              <input
                type="url"
                id="link_instagram"
                placeholder="Link profil Instagram Anda"
                value={formData.link_instagram}
                onChange={handleChange}
              />
            </div>

            <div className="social-input-wrapper">
              <i className="fab fa-linkedin"></i>
              <input
                type="url"
                id="link_linkedin"
                placeholder="Link profil LinkedIn Anda"
                value={formData.link_linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="social-input-wrapper">
              <i className="fas fa-link"></i>
              <input
                type="url"
                id="link_other"
                placeholder="Link lainnya"
                value={formData.link_other}
                onChange={handleChange}
              />
            </div>
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

      <footer style={{ textAlign: "center", marginTop: "30px", color: "#666" }}>
        <p>&copy; 2025 CookConnect.</p>
      </footer>
    </div>
  );
};

export default SetupProfile;