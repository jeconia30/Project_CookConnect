import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../styles/app.css"; 
import { initialRecipesData, getRecipesData } from "../data/recipes";
import RecipeCardProfile from "../components/RecipeCardProfile"; 

// Gambar Default
import defaultProfilePic from "../assets/geprek.jpeg"; 

// Data Default Profil (Fallback jika belum ada di localStorage)
const DEFAULT_PROFILE = {
    name: "Sari (Contoh)",
    username: "sari_masak",
    bio: "Hobi masak simpel yang enak! Ibu dari 2 anak. Suka berbagi resep harian anti-gagal.",
    photo: defaultProfilePic,
    pronouns: "dia/mereka",
    tiktok: "https://tiktok.com/@sari_masak",
    instagram: "https://instagram.com/sari_masak",
    linkedin: "",
    website: ""
};

// --- LOGIKA PERSISTENCE FOLLOW ---
const handleFollowToggle = (isCurrentUser, profileHandle) => {
    if (isCurrentUser) return true; 

    const followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];
    const isCurrentlyFollowing = followedUsers.includes(profileHandle);

    if (isCurrentlyFollowing) {
        if (window.confirm(`Yakin ingin berhenti mengikuti @${profileHandle}?`)) {
            const newFollowed = followedUsers.filter(handle => handle !== profileHandle);
            localStorage.setItem('followedUsers', JSON.stringify(newFollowed));
            return false;
        }
        return true; 
    } else {
        followedUsers.push(profileHandle);
        localStorage.setItem('followedUsers', JSON.stringify(followedUsers));
        return true;
    }
}


// --- COMPONENT PROFILE UTAMA YANG DIKONSOLIDASI ---
const ProfilePage = ({ isCurrentUser }) => { 
  const navigate = useNavigate();
  const { username: profileUsername } = useParams(); // Ambil username dari URL (jika bukan /profile/me)
  const [activeTab, setActiveTab] = useState("resep");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [savedRecipesList, setSavedRecipesList] = useState([]);
  
  // 1. Inisiasi data Profil
  const [profileData, setProfileData] = useState(() => {
      if (isCurrentUser) {
          const savedData = localStorage.getItem('userProfileData');
          return savedData ? JSON.parse(savedData) : DEFAULT_PROFILE;
      }
      // Mock data untuk profil orang lain
      const mockOtherUser = {
          name: "Budi (Rendang)",
          username: profileUsername || "budi_rendang",
          bio: "Spesialis masakan Padang. Rendang adalah hidupku!",
          photo: "https://ui-avatars.com/api/?name=Budi+Rendang&background=random",
          pronouns: "dia",
          tiktok: "https://tiktok.com/@budi_rendang",
          instagram: "",
          linkedin: "https://linkedin.com/in/budi",
          website: ""
      };
      return mockOtherUser;
  });

  // State untuk Follow Status
  const [isFollowing, setIsFollowing] = useState(() => {
    if (isCurrentUser) return false;
    const followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];
    return followedUsers.includes(profileUsername);
  });
  // ... (State Edit Form tetap sama) ...
  const [editFormData, setEditFormData] = useState(profileData);
  const [editImagePreview, setEditImagePreview] = useState(profileData.photo);
  
  
  // --- EFEK LOAD DATA & FOLLOW STATUS ---
  React.useEffect(() => {
    // 1. Ambil Data Resep Disimpan (Hanya untuk profil sendiri)
    if (isCurrentUser) {
        const savedIds = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        
        // --- PERBAIKAN LOGIKA: Gunakan getRecipesData() untuk filter yang komprehensif ---
        const allAvailableRecipes = getRecipesData(); 
        const filteredRecipes = allAvailableRecipes.filter(recipe => savedIds.includes(recipe.id));
        setSavedRecipesList(filteredRecipes);
    }

    // 2. Cek Status Follow (Jika ini bukan profil sendiri)
    if (!isCurrentUser) {
        const followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];
        setIsFollowing(followedUsers.includes(profileData.username));
    }
  },[isCurrentUser, profileData.username]);
  
  
  // --- HANDLERS ---
  // ... (handleOpenEdit, handleChange, handleEditImageChange tetap sama) ...
  const handleOpenEdit = () => {
      setEditFormData(profileData);
      setEditImagePreview(profileData.photo);
      setIsEditOpen(true);
      setMenuOpen(false);
  };
  const handleChange = (e) => {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };
  const handleEditImageChange = (e) => {
      const file = e.target.files[0];
      if (file) setEditImagePreview(URL.createObjectURL(file));
  };
  const handleSave = () => {
      const newProfileData = { ...editFormData, photo: editImagePreview };
      setProfileData(newProfileData);
      localStorage.setItem('userProfileData', JSON.stringify(newProfileData));
      alert("Profil berhasil diperbarui secara permanen!");
      setIsEditOpen(false); 
  };
  const handleFollowClick = () => {
      const newStatus = handleFollowToggle(isCurrentUser, profileData.username);
      setIsFollowing(newStatus); 
  };
  
  // --- DATA RESEP DARI LOCALSTORAGE ---
  const allRecipes = getRecipesData();
  const myUploadedRecipes = allRecipes.filter(recipe => {
      if (isCurrentUser) {
          return recipe.author === profileData.name; // Filter berdasarkan nama user yang login
      }
      return recipe.handle === profileData.username;
  });


  return (
    <div className="feed-area" style={{ maxWidth: '100%', flexGrow: 1 }}>
        <div className="myprofile-page" style={{ maxWidth: '900px', margin: '0 auto', background: 'white' }}>

          {/* HEADER (Di-simplify karena Navbar sudah di Layout) */}
          <div className="myprofile-cover" style={{ height: '190px' }}>
             {/* Tombol Back */}
            <button className="myprofile-back-btn" onClick={() => navigate(-1)} style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 10 }}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className="myprofile-header-text" style={{ position: 'absolute', top: '15px', left: '50px', zIndex: 10 }}>
              <strong>Profil {isCurrentUser ? 'Saya' : profileData.name}</strong>
              <span style={{ fontSize: '12px', display: 'block' }}>@{profileData.username}</span>
            </div>
          </div>

          {/* MAIN PROFILE INFO */}
          <div className="myprofile-main" style={{ borderBottom: isCurrentUser ? '1px solid #ddd' : 'none' }}>
            <img src={profileData.photo} alt="Profile" className="myprofile-photo" />

            <div className="myprofile-info">
              <h2 className="myprofile-name">{profileData.name}</h2>
              {profileData.pronouns && <div style={{ color: '#777', fontSize: '14px' }}>({profileData.pronouns})</div>}
              <div className="myprofile-followers"><strong>1.200</strong> Pengikut</div>
              <div className="myprofile-username">@{profileData.username}</div>

              <p className="myprofile-bio">
                {profileData.bio}
              </p>
            </div>

            {/* BUTTONS (Conditional: Sendiri vs Orang Lain) */}
            <div className="myprofile-buttons" style={{ position: isCurrentUser ? 'absolute' : 'static', top: '25px', right: '25px' }}>
              {isCurrentUser ? (
                  <>
                    <button className="myprofile-create-btn" onClick={() => navigate('/create')}>
                      Buat Resep
                    </button>
                    <button className="myprofile-dot-btn" onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
                    {/* DROPDOWN - HANYA UNTUK USER SENDIRI */}
                    <div className={`myprofile-dropdown ${menuOpen ? "show" : ""}`}>
                      <button onClick={handleOpenEdit}>Edit Profil</button> 
                      <button onClick={() => {
                          localStorage.removeItem('userProfileData');
                          localStorage.removeItem('savedRecipes');
                          localStorage.removeItem('userRecipes');
                          localStorage.removeItem('followedUsers');
                          navigate('/login');
                      }}>Logout</button>
                      <button className="danger">Hapus Akun</button>
                    </div>
                  </>
              ) : (
                  // TOMBOL FOLLOW UNTUK PROFIL ORANG LAIN
                  <button 
                      className="follow-btn" 
                      onClick={handleFollowClick}
                      style={{ background: isFollowing ? 'white' : '#2e7d32', color: isFollowing ? '#2e7d32' : 'white', border: isFollowing ? '1px solid #2e7d32' : 'none', padding: '10px 30px' }}
                  >
                      {isFollowing ? 'Mengikuti' : 'Ikuti'}
                  </button>
              )}
            </div>
          </div>

          {/* SOSIAL MEDIA BOX */}
          <div className="social-box-area">
            {profileData.tiktok && (<a href={profileData.tiktok} target="_blank" rel="noreferrer" className="social-item"><i className="fab fa-tiktok"></i> TikTok</a>)}
            {profileData.instagram && (<a href={profileData.instagram} target="_blank" rel="noreferrer" className="social-item"><i className="fab fa-instagram"></i> Instagram</a>)}
            {profileData.linkedin && (<a href={profileData.linkedin} target="_blank" rel="noreferrer" className="social-item"><i className="fab fa-linkedin"></i> LinkedIn</a>)}
            {profileData.website && (<a href={profileData.website} target="_blank" rel="noreferrer" className="social-item"><i className="fas fa-globe"></i> Website</a>)}
            {isCurrentUser && (!profileData.tiktok && !profileData.instagram && !profileData.linkedin && !profileData.website) && (
              <button onClick={handleOpenEdit} className="social-item" style={{background:'none', border:'2px dashed #ccc', color:'#888', cursor:'pointer'}}>
                <i className="fas fa-plus"></i> Tambah Tautan
              </button>
            )}
          </div>

          {/* TAB MENU - HANYA UNTUK PROFIL SENDIRI */}
          {isCurrentUser && (
              <div className="tab-menu">
                <div className={`tab-item ${activeTab === "resep" ? "active" : ""}`} onClick={() => setActiveTab("resep")}>
                   Resep Saya ({myUploadedRecipes.length})
                </div>
                <div className={`tab-item ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>
                   Disimpan ({savedRecipesList.length})
                </div>
                <div className="tab-underline" style={{ left: activeTab === "resep" ? "0%" : "50%" }}></div>
              </div>
          )}

          {/* CONTENT SECTION */}
          <div className="profile-container" style={{boxShadow: 'none', maxWidth: '100%', padding: '20px 0'}}> 
            
            {activeTab === "resep" || !isCurrentUser ? (
              /* TAB: RESEP SAYA (Default jika profil orang lain) */
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
                      <h3>{isCurrentUser ? 'Belum ada resep yang dibagikan' : 'Pengguna ini belum membagikan resep.'}</h3>
                      <p>{isCurrentUser ? 'Saat Anda membagikan resep, resep itu akan muncul di sini.' : ''}</p>
                      {isCurrentUser && <button className="cta-button" onClick={() => navigate('/create')} style={{marginTop: '15px'}}>Buat Resep Pertama</button>}
                   </div>
                </div>
              )
            ) : (
              /* TAB: DISIMPAN (HANYA UNTUK PROFIL SENDIRI) */
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


          {/* MODAL EDIT PROFILE - HANYA JIKA CURRENT USER */}
          {isCurrentUser && isEditOpen && (
              <div className="modal-overlay" onClick={() => setIsEditOpen(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                      <h3 className="modal-title">Edit Profil</h3>
                      <button className="close-btn" onClick={() => setIsEditOpen(false)}>×</button>
                  </div>

                  <div className="modal-body">
                      <div className="modal-image-upload-section">
                          <img src={editImagePreview} alt="Preview" className="modal-profile-pic-preview" />
                          <label htmlFor="modal-edit-pic" className="modal-change-pic-btn">
                            <i className="fas fa-camera"></i> Ubah Foto
                            <input type="file" id="modal-edit-pic" hidden accept="image/*" onChange={handleEditImageChange} />
                          </label>
                      </div>

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


                      <div className="modal-actions">
                          <button className="btn-cancel" onClick={() => setIsEditOpen(false)}>Batal</button>
                          <button className="btn-save" onClick={handleSave}>Simpan Perubahan</button>
                      </div>

                  </div>
                </div>
              </div>
          )}

        </div>
    </div>
  );
};

export default ProfilePage;