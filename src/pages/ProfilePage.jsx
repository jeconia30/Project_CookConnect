import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/app.css";
import api from "../api/axiosInstance";
import RecipeCardProfile from "../components/RecipeCardProfile";
import { uploadProfileAvatar } from "../services/uploadService"; 

import defaultProfilePic from "../assets/geprek.jpeg";

const DEFAULT_PROFILE = {
  name: "Pengguna",
  username: "user",
  bio: "Belum ada bio.",
  photo: defaultProfilePic,
  tiktok: "",
  instagram: "",
  linkedin: "",
  website: "",
  followers_count: 0,
  following_count: 0,
};

const ProfilePage = ({ isCurrentUser }) => {
  const navigate = useNavigate();
  const { username: profileUsername } = useParams();
  const [activeTab, setActiveTab] = useState("resep");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [profileData, setProfileData] = useState(DEFAULT_PROFILE);
  const [uploadedRecipes, setUploadedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  // State Edit
  const [editFormData, setEditFormData] = useState(DEFAULT_PROFILE);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const userToFetch = isCurrentUser ? "me" : profileUsername;
    const authToken = localStorage.getItem("authToken");

    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const profileRes = await api.get(`/users/${userToFetch}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const rawProfile = profileRes.data.profile || profileRes.data;

        const mappedProfile = {
          ...rawProfile,
          id: rawProfile.id,
          name: rawProfile.full_name,
          photo: rawProfile.avatar_url || defaultProfilePic,
          followers_count: rawProfile.followers_count || 0,
          following_count: rawProfile.following_count || 0,
        };

        setProfileData(mappedProfile);
        setIsFollowing(rawProfile.is_following === true);
      } catch (err) {
        console.error("Gagal ambil profil:", err);
      }

      try {
        const uploadedRes = await api.get(`/users/${userToFetch}/recipes`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUploadedRecipes(uploadedRes.data.recipes || []);
      } catch (err) {
        setUploadedRecipes([]); 
      }

      if (isCurrentUser) {
        try {
          const savedRes = await api.get(`/users/me/saved-recipes`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setSavedRecipes(savedRes.data.recipes || []);
        } catch (err) {
          setSavedRecipes([]);
        }
      }

      setIsLoading(false);
    };

    fetchAllData();
  }, [isCurrentUser, profileUsername]);

  const handleOpenEdit = () => {
    setEditFormData({
      ...profileData,
      tiktok: profileData.link_tiktok || "",
      instagram: profileData.link_instagram || "",
      linkedin: profileData.link_linkedin || "",
      website: profileData.link_other || "",
    });
    setEditImagePreview(profileData.photo);
    setIsEditOpen(true);
    setMenuOpen(false);
  };

  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImagePreview(URL.createObjectURL(file));
      setUploadingImage(true);

      try {
        const userId = profileData.id;
        const result = await uploadProfileAvatar(file, userId);
        setEditFormData((prev) => ({ ...prev, avatar_url: result.url }));
        setEditImagePreview(result.url);
      } catch (error) {
        alert("Gagal mengupload foto.");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleSave = async () => {
    const authToken = localStorage.getItem("authToken");
    const payload = {
      full_name: editFormData.name,
      username: editFormData.username,
      bio: editFormData.bio,
      pronouns: editFormData.pronouns,
      avatar_url: editFormData.avatar_url || profileData.avatar_url,
      link_tiktok: editFormData.tiktok,
      link_instagram: editFormData.instagram,
      link_linkedin: editFormData.linkedin,
      link_other: editFormData.website,
    };

    try {
      await api.put(`/users/me/profile`, payload, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setProfileData((prev) => ({
        ...prev,
        ...payload,
        name: payload.full_name,
        photo: payload.avatar_url || prev.photo, 
      }));

      const oldStorage = JSON.parse(localStorage.getItem('userProfileData') || '{}');
      const newStorage = { 
          ...oldStorage, 
          ...payload, 
          avatar_url: payload.avatar_url,
          photo: payload.avatar_url 
      };
      localStorage.setItem('userProfileData', JSON.stringify(newStorage));

      alert("Profil berhasil diperbarui!");
      setIsEditOpen(false);
      window.location.reload(); 

    } catch (err) {
      alert("Gagal memperbarui profil.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Yakin ingin menghapus akun? SEMUA DATA HILANG PERMANEN.")) return;
    const authToken = localStorage.getItem("authToken");
    try {
      await api.delete(`/users/${profileData.id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      alert("Gagal menghapus akun.");
    }
  };

  const handleFollowClick = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return alert("Login dulu.");
    try {
      const action = isFollowing ? "unfollow" : "follow";
      await api.post(`/users/${profileData.username}/${action}`, {}, {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setIsFollowing(!isFollowing);
      setProfileData((prev) => ({
        ...prev,
        followers_count: prev.followers_count + (isFollowing ? -1 : 1),
      }));
    } catch (err) {
      alert("Gagal memproses.");
    }
  };

  if (isLoading)
    return (
      <div className="feed-area" style={{ textAlign: "center", marginTop: "20px" }}>
        Memuat Profil...
      </div>
    );

  return (
    <div className="feed-area" style={{ maxWidth: "100%", flexGrow: 1 }}>
      <div className="myprofile-page">
        
        {/* HEADER COVER */}
        <div className="myprofile-cover">
          <button className="myprofile-back-btn" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>

        {/* INFO PROFIL */}
        <div className="myprofile-main">
          <img src={profileData.photo} alt="Profile" className="myprofile-photo" />

          {/* TOMBOL EDIT/FOLLOW */}
          <div className="myprofile-buttons" style={{ position: 'absolute', top: '20px', right: '30px' }}>
            {isCurrentUser ? (
              <>
                <button className="myprofile-create-btn" onClick={() => navigate("/create")}>
                  Buat Resep
                </button>
                <button className="myprofile-dot-btn" onClick={() => setMenuOpen(!menuOpen)}>
                  ⋮
                </button>
                <div className={`myprofile-dropdown ${menuOpen ? "show" : ""}`}>
                  <button onClick={handleOpenEdit}>Edit Profil</button>
                  <button onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
                  <button className="danger" onClick={handleDeleteAccount}>Hapus Akun</button>
                </div>
              </>
            ) : (
              <button
                className="follow-btn"
                onClick={handleFollowClick}
                style={{
                  background: isFollowing ? "white" : "#2e7d32",
                  color: isFollowing ? "#2e7d32" : "white",
                  border: isFollowing ? "1px solid #2e7d32" : "none",
                  padding: "8px 24px",
                  borderRadius: "20px",
                  fontWeight: "bold"
                }}
              >
                {isFollowing ? "Mengikuti" : "Ikuti"}
              </button>
            )}
          </div>

          <div className="myprofile-info-wrapper">
            <h2 className="myprofile-name">{profileData.name}</h2>
            
            <div className="user-stats-row">
              <div className="myprofile-username">@{profileData.username}</div>
              <div className="stats-group">
                <div className="stat-item">
                  <strong>{profileData.followers_count}</strong> Pengikut
                </div>
                <div className="stat-item">
                  <strong>{profileData.following_count}</strong> Mengikuti
                </div>
              </div>
            </div>

            <p className="myprofile-bio">
              {profileData.bio || "Belum ada bio."}
            </p>

            <div className="divider-line"></div>

            {/* LINK SOSMED */}
            <div className="social-box-area">
              {(profileData.link_tiktok || profileData.tiktok) && (
                <a href={profileData.link_tiktok || profileData.tiktok} target="_blank" rel="noreferrer" className="social-item">
                  <i className="fab fa-tiktok"></i> TikTok
                </a>
              )}
              {(profileData.link_instagram || profileData.instagram) && (
                <a href={profileData.link_instagram || profileData.instagram} target="_blank" rel="noreferrer" className="social-item">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              )}
              {(profileData.link_linkedin || profileData.linkedin) && (
                <a href={profileData.link_linkedin || profileData.linkedin} target="_blank" rel="noreferrer" className="social-item">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              )}
              {(profileData.link_other || profileData.website) && (
                <a href={profileData.link_other || profileData.website} target="_blank" rel="noreferrer" className="social-item">
                  <i className="fas fa-globe"></i> Website
                </a>
              )}

              {isCurrentUser && !profileData.link_tiktok && !profileData.link_instagram && !profileData.link_linkedin && !profileData.link_other && (
                  <button onClick={handleOpenEdit} className="social-item" style={{ background: "none", border: "2px dashed #ccc", color: "#888", cursor: "pointer" }}>
                    <i className="fas fa-plus"></i> Link
                  </button>
                )}
            </div>
          </div>
        </div>

        {/* TAB MENU - HANYA UNTUK USER SENDIRI */}
        {isCurrentUser && (
          <div className="tab-menu" style={{ marginTop: '10px' }}>
            <div className={`tab-item ${activeTab === "resep" ? "active" : ""}`} onClick={() => setActiveTab("resep")}>
              Resep Saya ({uploadedRecipes.length})
            </div>
            <div className={`tab-item ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>
              Disimpan ({savedRecipes.length})
            </div>
            <div className="tab-underline" style={{ left: activeTab === "resep" ? "0%" : "50%" }}></div>
          </div>
        )}

        {/* JUDUL BAGIAN RESEP (HANYA MUNCUL JIKA BUKAN PROFIL SENDIRI) */}
        {!isCurrentUser && (
          <h3 className="section-title-center">Resep Diposting</h3>
        )}

        {/* KONTEN RESEP (3 KOLOM) */}
        <div className="profile-container" style={{ boxShadow: "none", maxWidth: "100%", padding: "0" }}>
          {activeTab === "resep" || !isCurrentUser ? (
            uploadedRecipes.length > 0 ? (
              <div className="recipe-grid-profile">
                {uploadedRecipes.map((recipe) => (
                  <RecipeCardProfile key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="myprofile-empty-section">
                <div className="empty-box">
                  <i className="fas fa-book-open empty-icon"></i>
                  <h3>Belum ada resep diposting.</h3>
                  {isCurrentUser && (
                    <button className="cta-button" onClick={() => navigate("/create")} style={{ marginTop: "15px" }}>
                      Buat Resep Pertama
                    </button>
                  )}
                </div>
              </div>
            )
          ) : savedRecipes.length > 0 ? (
            <div className="recipe-grid-profile">
              {savedRecipes.map((recipe) => (
                <RecipeCardProfile key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="myprofile-empty-section">
              <div className="empty-box">
                <i className="fas fa-bookmark empty-icon"></i>
                <h3>Belum ada resep tersimpan.</h3>
              </div>
            </div>
          )}
        </div>

        {/* MODAL EDIT */}
        {isCurrentUser && isEditOpen && (
          <div className="modal-overlay" onClick={() => setIsEditOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Edit Profil</h3>
                <button className="close-btn" onClick={() => setIsEditOpen(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="modal-image-upload-section">
                  <img src={editImagePreview || defaultProfilePic} alt="Preview" className="modal-profile-pic-preview" />
                  <label htmlFor="modal-edit-pic" className="modal-change-pic-btn">
                    <i className="fas fa-camera"></i> {uploadingImage ? "Mengupload..." : "Ubah Foto"}
                    <input type="file" id="modal-edit-pic" hidden accept="image/*" onChange={handleEditImageChange} disabled={uploadingImage} />
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
                  <label>Bio</label>
                  <input type="text" name="bio" value={editFormData.bio} onChange={handleChange} />
                </div>
                <h4 className="modal-section-title">Sosial Media</h4>
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
                  <input type="text" name="website" placeholder="Link Website" value={editFormData.website} onChange={handleChange} />
                </div>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setIsEditOpen(false)}>Batal</button>
                  <button className="btn-save" onClick={handleSave} disabled={uploadingImage}>Simpan</button>
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