import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/app.css"; // Pastikan CSS tambahan tadi sudah disimpan

// Gambar Default
import defaultProfilePic from "../assets/geprek.jpeg"; 

const MyProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resep");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // --- STATE DATA PROFIL UTAMA (LENGKAP) ---
  const [profileData, setProfileData] = useState({
    name: "Sari (Contoh)",
    username: "sari_masak",
    bio: "Hobi masak simpel yang enak! Ibu dari 2 anak. Suka berbagi resep harian anti-gagal.",
    photo: defaultProfilePic,
    // Data Link Sosial Media
    tiktok: "https://tiktok.com/@sari_masak",
    instagram: "https://instagram.com/sari_masak",
    linkedin: "",
    website: ""
  });

  // --- STATE UNTUK FORM EDIT (SEMENTARA) ---
  const [editFormData, setEditFormData] = useState(profileData);
  // State khusus untuk preview gambar di modal
  const [editImagePreview, setEditImagePreview] = useState(null);

  // --- FUNGSI-FUNGSI ---

  // 1. Buka Modal & Siapkan Data
  const handleOpenEdit = () => {
    setEditFormData(profileData); // Copy data asli ke form
    setEditImagePreview(profileData.photo); // Set preview awal sama dengan foto sekarang
    setIsEditOpen(true);
    setMenuOpen(false);
  };

  // 2. Handle Ketik di Input Teks
  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // 3. Handle Pilih File Gambar Baru
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Buat URL preview sementara dari file yang dipilih
      setEditImagePreview(URL.createObjectURL(file));
      // Nanti di sini logic upload ke backend beneran
    }
  };

  // 4. Simpan Perubahan
  const handleSave = () => {
    // Update profileData utama dengan data dari form DAN gambar baru
    setProfileData({
      ...editFormData,
      photo: editImagePreview // Pakai gambar dari preview terakhir
    });
    
    alert("Profil berhasil diperbarui! (Simulasi)");
    setIsEditOpen(false); // Tutup modal
  };


  return (
    <div className="myprofile-page">

      {/* HEADER */}
      <div className="myprofile-header">
        <button className="myprofile-back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="myprofile-header-text">
          <strong>Profil Saya</strong>
        </div>
      </div>

      {/* COVER */}
      <div className="myprofile-cover"></div>

      {/* MAIN PROFILE INFO (MENGGUNAKAN profileData UTAMA) */}
      <div className="myprofile-main">
        <img src={profileData.photo} alt="Profile" className="myprofile-photo" />

        <div className="myprofile-info">
          <h2 className="myprofile-name">{profileData.name}</h2>
          <div className="myprofile-followers"><strong>1.200</strong> Pengikut</div>
          <div className="myprofile-username">@{profileData.username}</div>

          <p className="myprofile-bio">
            {profileData.bio}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="myprofile-buttons">
          <button className="myprofile-create-btn" onClick={() => navigate('/create')}>
            Buat Resep
          </button>

          {/* DOT MENU */}
          <button
            className="myprofile-dot-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ⋮
          </button>

          {/* DROPDOWN */}
          <div className={`myprofile-dropdown ${menuOpen ? "show" : ""}`}>
            <button onClick={handleOpenEdit}>Edit Profil</button> 
            <button onClick={() => navigate('/login')}>Logout</button>
            <button className="danger">Hapus Akun</button>
          </div>
        </div>
      </div>

      {/* SOSIAL MEDIA BOX (DINAMIS BERDASARKAN DATA) */}
      <div className="social-box-area">
        {/* Hanya tampilkan jika linknya ada isinya */}
        {profileData.tiktok && (
          <a href={profileData.tiktok} target="_blank" rel="noreferrer" className="social-item">
            <i className="fab fa-tiktok"></i> TikTok
          </a>
        )}
        {profileData.instagram && (
          <a href={profileData.instagram} target="_blank" rel="noreferrer" className="social-item">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        )}
        {profileData.linkedin && (
          <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="social-item">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
        )}
        {profileData.website && (
          <a href={profileData.website} target="_blank" rel="noreferrer" className="social-item">
            <i className="fas fa-globe"></i> Website
          </a>
        )}
        {/* Tombol tambah jika belum lengkap (opsional) */}
        {(!profileData.tiktok || !profileData.instagram || !profileData.linkedin || !profileData.website) && (
           <button onClick={handleOpenEdit} className="social-item" style={{background:'none', border:'2px dashed #ccc', color:'#888', cursor:'pointer'}}>
             <i className="fas fa-plus"></i> Tambah
           </button>
        )}
      </div>

      {/* TAB MENU */}
      <div className="tab-menu">
        <div className={`tab-item ${activeTab === "resep" ? "active" : ""}`} onClick={() => setActiveTab("resep")}>
           Resep Saya
        </div>
        <div className={`tab-item ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>
           Disimpan
        </div>
        <div className="tab-underline" style={{ left: activeTab === "resep" ? "0%" : "50%" }}></div>
      </div>

      {/* CONTENT PLACEHOLDER */}
      <div className="myprofile-empty-section">
        {activeTab === "resep" ? (
          <div className="empty-box">
            <i className="fas fa-book-open empty-icon"></i>
            <h3>Belum ada resep yang dibagikan</h3>
            <p>Saat Anda membagikan resep, resep itu akan muncul di sini.</p>
          </div>
        ) : (
          <div className="empty-box">
            <i className="fas fa-bookmark empty-icon"></i>
            <h3>Belum ada resep tersimpan</h3>
            <p>Resep yang Anda simpan akan muncul di sini.</p>
          </div>
        )}
      </div>


      {/* ======================================= */}
      {/* MODAL POP-UP EDIT PROFILE (LENGKAP)     */}
      {/* ======================================= */}
      
      {isEditOpen && (
        <div className="modal-overlay" onClick={() => setIsEditOpen(false)}>
          {/* stopPropagation biar klik di form gak nutup modal */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h3 className="modal-title">Edit Profil</h3>
              <button className="close-btn" onClick={() => setIsEditOpen(false)}>×</button>
            </div>

            <div className="modal-body">
              
              {/* 1. BAGIAN UPLOAD FOTO */}
              <div className="modal-image-upload-section">
                {/* Preview Gambar */}
                <img src={editImagePreview} alt="Preview" className="modal-profile-pic-preview" />
                
                {/* Tombol & Input File */}
                <label htmlFor="modal-edit-pic" className="modal-change-pic-btn">
                  <i className="fas fa-camera"></i> Ubah Foto
                  {/* Input file disembunyikan */}
                  <input 
                    type="file" 
                    id="modal-edit-pic" 
                    hidden 
                    accept="image/*"
                    onChange={handleEditImageChange} 
                  />
                </label>
              </div>

              {/* 2. BAGIAN DATA DIRI */}
              <div className="modal-form-group">
                <label>Nama Lengkap</label>
                <input type="text" name="name" value={editFormData.name} onChange={handleChange} />
              </div>

              <div className="modal-form-group">
                <label>Username</label>
                <input type="text" name="username" value={editFormData.username} onChange={handleChange} />
              </div>

              <div className="modal-form-group">
                <label>Bio</label>
                <textarea name="bio" rows="3" value={editFormData.bio} onChange={handleChange}></textarea>
              </div>

              {/* 3. BAGIAN SOSIAL MEDIA */}
              <h4 className="modal-section-title">Sosial Media / Tautan</h4>

              <div className="modal-form-group modal-social-input-wrapper">
                <i className="fab fa-tiktok"></i>
                <input type="text" name="tiktok" placeholder="Link TikTok" value={editFormData.tiktok} onChange={handleChange} />
              </div>

              <div className="modal-form-group modal-social-input-wrapper">
                <i className="fab fa-instagram"></i>
                <input type="text" name="instagram" placeholder="Link Instagram" value={editFormData.instagram} onChange={handleChange} />
              </div>

              <div className="modal-form-group modal-social-input-wrapper">
                <i className="fab fa-linkedin"></i>
                <input type="text" name="linkedin" placeholder="Link LinkedIn" value={editFormData.linkedin} onChange={handleChange} />
              </div>

              <div className="modal-form-group modal-social-input-wrapper">
                 <i className="fas fa-globe"></i>
                <input type="text" name="website" placeholder="Link Website/Lainnya" value={editFormData.website} onChange={handleChange} />
              </div>


              {/* TOMBOL AKSI */}
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setIsEditOpen(false)}>Batal</button>
                <button className="btn-save" onClick={handleSave}>Simpan Perubahan</button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyProfile;