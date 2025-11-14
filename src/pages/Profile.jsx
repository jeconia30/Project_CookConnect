import React, { useState } from 'react';
import styles from './Profile.module.css'; 

function Profile({ isMyProfile = false, initialFollowers = 1200 }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(initialFollowers);
  const [activeTab, setActiveTab] = useState('recipes'); // 'recipes' atau 'saved'
  const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const profile = {
    name: isMyProfile ? 'Nama User (Saya)' : 'Sari (Contoh)',
    username: isMyProfile ? '@username_saya' : '@sari_masak',
    bio: isMyProfile 
      ? 'Ini adalah bio saya. Saya suka memasak dan mencoba resep baru setiap akhir pekan!'
      : 'Hobi masak simpel yang enak! Ibu dari 2 anak. Suka berbagi resep harian anti-gagal.',
    recipeCount: isMyProfile ? 0 : 3,
    savedRecipeCount: isMyProfile ? 2 : 0,
  };

  const handleFollowToggle = () => {
    if (isFollowing) {

      setIsUnfollowModalOpen(true);
    } else {
  
      setIsFollowing(true);
      setFollowerCount(prev => prev + 1);
    }
  };

  const confirmUnfollow = () => {
    setIsFollowing(false);
    setFollowerCount(prev => prev - 1);
    setIsUnfollowModalOpen(false);
  };
  
  const formatCount = (num) => num.toLocaleString('id-ID');

  const renderActionButtons = () => {
    if (isMyProfile) {
      return (
        <div className={styles.profileActionButtons}>
          <button
            type="button"
            className="cta-button button-secondary"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profil
          </button>
          <a href="create-recipe.html" className="cta-button">
            Buat Resep
          </a>
          <a href="index.html" className="cta-button button-danger">
            Logout
          </a>
        </div>
      );
    } else {
    
      const buttonClass = isFollowing ? styles.following : styles.follow;
      const buttonText = isFollowing ? 'Mengikuti' : 'Ikuti';

      return (
        <button
          className={`cta-button ${styles.followButton} ${buttonClass}`}
          id={styles.profileActionButton}
          onClick={handleFollowToggle}
        >
          {buttonText}
        </button>
      );
    }
  };
  
  const renderTabs = () => {
    return (
      <div className={styles.profileTabs}>
        <a 
          href="#" 
          className={`${styles.tabItem} ${activeTab === 'recipes' ? styles.active : ''}`}
          onClick={(e) => { e.preventDefault(); setActiveTab('recipes'); }}
          id="tab-my-recipes"
        >
          <i className="fas fa-book-open"></i> Resep {isMyProfile ? 'Saya' : ''}
        </a>
        
        {isMyProfile && (
          <a 
            href="#" 
            className={`${styles.tabItem} ${activeTab === 'saved' ? styles.active : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('saved'); }}
            id="tab-saved-recipes"
          >
            <i className="fas fa-bookmark"></i> Disimpan
          </a>
        )}
      </div>
    );
  };
  
  const renderRecipeGrids = () => {
    const isMyRecipesActive = activeTab === 'recipes';
    const isSavedRecipesActive = activeTab === 'saved';
    
    const recipeGrid = (
      <div 
        className={`${styles.profileRecipeGrid} ${!isMyRecipesActive ? styles.hidden : ''}`}
        id="grid-my-recipes"
      >
        {profile.recipeCount > 0 ? (
          <>
            <a href="recipe-detail.html" className={styles.profileRecipeCard}>
              <img src="src/geprek.jpeg" alt="Ayam Geprek" />
              <h4>Ayam Geprek Sambal Matah</h4>
            </a>
            {/* ... resep lainnya */}
          </>
        ) : (
          <div className={styles.emptyStateMessage}>
            <i className="fas fa-book-open"></i>
            <p>Belum ada resep yang dibagikan</p>
            <span>Saat {isMyProfile ? 'Anda' : profile.name} membagikan resep, resep itu akan muncul di sini.</span>
          </div>
        )}
      </div>
    );
    
    const savedGrid = isMyProfile && (
      <div 
        className={`${styles.profileRecipeGrid} ${!isSavedRecipesActive ? styles.hidden : ''}`} 
        id="grid-saved-recipes"
      >
        <a href="#" className={styles.profileRecipeCard}>
          <img src="src/rendang.jpeg" alt="Rendang" />
          <h4>Rendang Padang Klasik</h4>
        </a>
        <a href="#" className={styles.profileRecipeCard}>
          <img src="src/brownies.jpeg" alt="Brownies" />
          <h4>Brownies Kukus 3 Bahan</h4>
        </a>
      </div>
    );

    return (
      <>
        {recipeGrid}
        {savedGrid}
      </>
    );
  };

  const renderEditProfileModal = () => {
    if (!isMyProfile) return null;

    return (
      <div className={`${styles.modalOverlay} ${isEditModalOpen ? styles.modalActive : ''}`} id="edit-profile-modal">
        <div className={`${styles.modalContent} ${styles.large}`}>
          <form id="setup-form" className={styles.authForm} onSubmit={(e) => { e.preventDefault(); /* Logic simpan */ setIsEditModalOpen(false); }}>
            <h2 className={styles.profileSetupTitle}>Lengkapi Profil Anda</h2>

            <div className={styles.profilePicUploadArea}>
              <div className={`${styles.profilePicLarge} profile-placeholder`}></div>
              <label htmlFor="profile-pic" className={styles.changePicButton}>
                <i className="fas fa-camera"></i> Ubah Foto Profil
                <input
                  type="file"
                  id="profile-pic"
                  accept="image/*"
                  className={styles.hiddenFileInput}
                />
              </label>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name">Nama</label>
              <input type="text" id="name" placeholder="Nama Lengkap Anda" />
            </div>
            {/* ... form groups lainnya ... */}
            <div className={styles.formGroup}>
              <label htmlFor="bio">Bio Singkat</label>
              <textarea
                id="bio"
                rows="3"
                placeholder="Ceritakan sedikit tentang diri Anda..."
              ></textarea>
            </div>
            <div className={`${styles.formGroup} ${styles.socialLinksGroup}`}>
              <label>Tambahkan Tautan (Opsional)</label>
              <div className={styles.socialInputWrapper}>
                <i className="fab fa-tiktok"></i>
                <input type="url" id="link-tiktok" placeholder="Link profil TikTok Anda" />
              </div>
              {/* ... input sosial media lainnya ... */}
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className="cta-button modal-button button-secondary"
                onClick={() => setIsEditModalOpen(false)}
              >
                Batal
              </button>
              <button type="submit" className="cta-button modal-button">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderUnfollowModal = () => {
    if (isMyProfile) return null;

    return (
      <div className={`${styles.modalOverlay} ${isUnfollowModalOpen ? styles.modalActive : ''}`} id="unfollow-modal">
        <div className={styles.modalContent}>
          <p>
            Apakah yakin mau berhenti mengikuti
            <strong id="modal-message-username"> {profile.username}</strong>?
          </p>
          <div className={styles.modalActions}>
            <button className="cta-button modal-button" id="modal-btn-batal" onClick={() => setIsUnfollowModalOpen(false)}>
              Batal
            </button>
            <button
              className="cta-button modal-button button-danger"
              id="modal-btn-ya"
              onClick={confirmUnfollow}
            >
              Ya, Berhenti
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <main className="container my-profile-container"> 
      {/* my-profile-container class harus didefinisikan secara global atau diimpor */}
      
      <section className={styles.profileMain}>
        <div className={styles.profileHeaderContainer}>
          {/* Profile Top Bar */}
          <div className={styles.profileTopBar}>
            <button className={styles.backButton} onClick={() => window.history.back()}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className={styles.profileTopBarTitle}>
              <strong>{isMyProfile ? 'Profil Saya' : 'Profil'}</strong>
              <span>{profile.username}</span>
            </div>
          </div>
          <div className={styles.profileCoverPhoto}></div>

          {/* Profile Details */}
          <div className={styles.profileDetails}>
            <div className={styles.profilePicLarge} style={{ backgroundImage: `url('src/geprek.jpeg')` }}></div>
            <div className={styles.profileUserInfo}>
              <div className={styles.profileNameLine}>
                <h2>{profile.name}</h2>
                <div className={styles.profileStatsInline}>
                  <strong>{formatCount(followerCount)}</strong> <span>Pengikut</span>
                </div>
              </div>
              <span>{profile.username}</span>
            </div>
            {renderActionButtons()}
          </div>

          {/* Profile Bio */}
          <div className={styles.profileBio}>
            <p>{profile.bio}</p>
          </div>
        </div>
        
        {/* Profile Links */}
        <div className={styles.profileLinks}>
          <a href="#" className={styles.profileLinkItem} target="_blank">
            <i className="fab fa-tiktok"></i>
            <span>TikTok</span>
          </a>
          <a href="#" className={styles.profileLinkItem} target="_blank">
            <i className="fab fa-instagram"></i>
            <span>Instagram</span>
          </a>
          <a href="#" className={styles.profileLinkItem} target="_blank">
            <i className="fab fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
          <a href="#" className={styles.profileLinkItem} target="_blank">
            <i className="fas fa-link"></i>
            <span>Website</span>
          </a>
        </div>

        {/* Profile Tabs */}
        {renderTabs()}

        {/* Recipe Grids */}
        {renderRecipeGrids()}
        
      </section>

      {/* Modals */}
      {renderUnfollowModal()}
      {renderEditProfileModal()}

      {/* Asumsi komponen Footer berada di luar komponen ini atau diimpor di sini */}
    </main>
  );
}

export default Profile;
