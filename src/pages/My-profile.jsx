import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/app.css"; 
import { recipesData } from "../data/recipes"; 
import RecipeCardProfile from "../components/RecipeCardProfile"; // Component resep grid

// Gambar Default
import defaultProfilePic from "../assets/geprek.jpeg"; 

// Data Default Profil (Fallback jika belum ada di localStorage)
const DEFAULT_PROFILE = {
    name: "Sari (Contoh)",
    username: "sari_masak",
    bio: "Hobi masak simpel yang enak! Ibu dari 2 anak. Suka berbagi resep harian anti-gagal.",
    photo: defaultProfilePic,
    pronouns: "dia/mereka", // Tambahkan pronouns jika kamu punya inputnya di form
    // Data Link Sosial Media
    tiktok: "https://tiktok.com/@sari_masak",
    instagram: "https://instagram.com/sari_masak",
    linkedin: "",
    website: ""
};

const MyProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resep");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [savedRecipesList, setSavedRecipesList] = useState([]);

  // --- 1. STATE DATA PROFIL UTAMA (DARI LOCALSTORAGE) ---
  const [profileData, setProfileData] = useState(() => {
      const savedData = localStorage.getItem('userProfileData');
      return savedData ? JSON.parse(savedData) : DEFAULT_PROFILE;
  });

  // --- STATE UNTUK FORM EDIT (SEMENTARA) ---
  const [editFormData, setEditFormData] = useState(profileData);
  const [editImagePreview, setEditImagePreview] = useState(profileData.photo);
  
  // --- EFEK LOAD DATA SIMPANAN & RESEP SAYA (DARI LOCALSTORAGE) ---
  React.useEffect(() => {
    // Ambil ID resep yang disimpan dari LocalStorage
    const savedIds = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    // Filter data resep asli berdasarkan ID yang disimpan
    const filteredRecipes = recipesData.filter(recipe => savedIds.includes(recipe.id));
    setSavedRecipesList(filteredRecipes);
    
    // Selain itu, kita juga perbarui data profil saat halaman dimuat
    const initialLoadData = localStorage.getItem('userProfileData');
    if(initialLoadData) {
        setProfileData(JSON.parse(initialLoadData));
    }

  }, [activeTab]);

  // --- FUNGSI-FUNGSI ---

  const handleOpenEdit = () => {
    setEditFormData(profileData); // Copy data asli ke form
    setEditImagePreview(profileData.photo); // Set preview awal sama dengan foto sekarang
    setIsEditOpen(true);
    setMenuOpen(false);
  };

  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImagePreview(URL.createObjectURL(file));
      // Di sini nanti logic upload ke backend beneran
    }
  };

  // --- 2. FUNGSI SIMPAN PERMANEN KE LOCALSTORAGE ---
  const handleSave = () => {
    const newProfileData = {
        ...editFormData,
        photo: editImagePreview // Gunakan gambar dari preview terakhir
    };
    
    // 1. Update state React
    setProfileData(newProfileData);
    
    // 2. Simpan PERMANEN ke localStorage
    localStorage.setItem('userProfileData', JSON.stringify(newProfileData));
    
    alert("Profil berhasil diperbarui secara permanen!");
    setIsEditOpen(false); // Tutup modal
  };

  // --- MOCK DATA RESEP SAYA (Termasuk resep dari Create Recipe) ---
  // Kita ambil resep dari userRecipes yang dibuat di fitur Create Recipe
  const myUploadedRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];


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

      {/* MAIN PROFILE INFO */}
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
            {/* Tombol Logout akan menghapus semua data simulasi */}
            <button onClick={() => {
                localStorage.removeItem('userProfileData');
                localStorage.removeItem('savedRecipes');
                localStorage.removeItem('userRecipes');
                navigate('/login');
            }}>Logout</button>
            <button className="danger">Hapus Akun</button>
          </div>
        </div>
      </div>

      {/* SOSIAL MEDIA BOX (DINAMIS) */}
      <div className="social-box-area">
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
         {(!profileData.tiktok && !profileData.instagram && !profileData.linkedin && !profileData.website) && (
           <button onClick={handleOpenEdit} className="social-item" style={{background:'none', border:'2px dashed #ccc', color:'#888', cursor:'pointer'}}>
             <i className="fas fa-plus"></i> Tambah Tautan
           </button>
        )}
      </div>

      {/* TAB MENU */}
      <div className="tab-menu">
        <div className={`tab-item ${activeTab === "resep" ? "active" : ""}`} onClick={() => setActiveTab("resep")}>
           Resep Saya ({myUploadedRecipes.length})
        </div>
        <div className={`tab-item ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>
           Disimpan ({savedRecipesList.length})
        </div>
        <div className="tab-underline" style={{ left: activeTab === "resep" ? "0%" : "50%" }}></div>
      </div>

      {/* CONTENT SECTION (MENAMPILKAN RESEP SAYA & SIMPANAN) */}
      <div className="profile-container" style={{boxShadow: 'none', maxWidth: '100%', padding: '20px 0'}}> 
        
        {activeTab === "resep" ? (
          /* TAB: RESEP SAYA */
          myUploadedRecipes.length > 0 ? (
            <div className="recipe-grid-profile">
                {myUploadedRecipes.map((recipe) => (
                    <RecipeCardProfile key={recipe.id} recipe={recipe} />
                ))}
            </div>
          ) : (
            <div className="myprofile-empty-section">
               <div className="empty-box">
                  <i className="fas fa-book-open empty-icon"></i>
                  <h3>Belum ada resep yang dibagikan</h3>
                  <p>Saat Anda membagikan resep, resep itu akan muncul di sini.</p>
                  <button className="cta-button" onClick={() => navigate('/create')} style={{marginTop: '15px'}}>Buat Resep Pertama</button>
               </div>
            </div>
          )
        ) : (
          /* TAB: DISIMPAN */
          savedRecipesList.length > 0 ? (
            <div className="recipe-grid-profile"> 
              {savedRecipesList.map((recipe) => (
                <RecipeCardProfile key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="myprofile-empty-section">
              <div className="empty-box">
                <i className="fas fa-bookmark empty-icon"></i>
                <h3>Belum ada resep tersimpan</h3>
                <p>Simpan resep dari Feed agar muncul di sini.</p>
              </div>
            </div>
          )
        )}
      </div>


      {/* ======================================= */}
      {/* MODAL POP-UP EDIT PROFILE (KODE LAMA DENGAN PERBAIKAN)     */}
      {/* ======================================= */}
      
      {isEditOpen && (
        <div className="modal-overlay" onClick={() => setIsEditOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h3 className="modal-title">Edit Profil</h3>
              <button className="close-btn" onClick={() => setIsEditOpen(false)}>×</button>
            </div>

            <div className="modal-body">
              
              {/* 1. BAGIAN UPLOAD FOTO */}
              <div className="modal-image-upload-section">
                <img src={editImagePreview} alt="Preview" className="modal-profile-pic-preview" />
                
                <label htmlFor="modal-edit-pic" className="modal-change-pic-btn">
                  <i className="fas fa-camera"></i> Ubah Foto
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
                <label>Kata Ganti</label>
                <input type="text" name="pronouns" placeholder="cth: dia/mereka" value={editFormData.pronouns} onChange={handleChange} />
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