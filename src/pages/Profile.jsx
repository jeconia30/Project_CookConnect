import React, { useState } from 'react';
import './Profile.css'; // Import CSS secara global

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
        // PERBAIKAN: styles.profileActionButtons -> "profileActionButtons"
        <div className="profileActionButtons"> 
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
    
      // PERBAIKAN: styles.following/styles.follow -> "following"/"follow"
      const buttonClass = isFollowing ? "following" : "follow";
      const buttonText = isFollowing ? 'Mengikuti' : 'Ikuti';

      return (
        // PERBAIKAN: styles.followButton -> "followButton", id={styles.profileActionButton} -> id="profileActionButton"
        <button
          className={`cta-button followButton ${buttonClass}`}
          id="profile-action-button" // Menggunakan ID yang ada di CSS Anda
          onClick={handleFollowToggle}
        >
          {buttonText}
        </button>
      );
    }
  };
  
  const renderTabs = () => {
    return (
      // PERBAIKAN: styles.profileTabs -> "profileTabs"
      <div className="profileTabs">
        <a 
          href="#" 
          // PERBAIKAN: styles.tabItem -> "tabItem", styles.active -> "active"
          className={`tabItem ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); setActiveTab('recipes'); }}
          id="tab-my-recipes"
        >
          <i className="fas fa-book-open"></i> Resep {isMyProfile ? 'Saya' : ''}
        </a>
        
        {isMyProfile && (
          <a 
            href="#" 
            // PERBAIKAN: styles.tabItem -> "tabItem", styles.active -> "active"
            className={`tabItem ${activeTab === 'saved' ? 'active' : ''}`}
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
        // PERBAIKAN: styles.profileRecipeGrid -> "profileRecipeGrid", styles.hidden -> "hidden"
        className={`profileRecipeGrid ${!isMyRecipesActive ? 'hidden' : ''}`}
        id="grid-my-recipes"
      >
        {profile.recipeCount > 0 ? (
          <>
            {/* PERBAIKAN: styles.profileRecipeCard -> "profileRecipeCard" */}
            <a href="recipe-detail.html" className="profileRecipeCard">
              <img src="src/geprek.jpeg" alt="Ayam Geprek" />
              <h4>Ayam Geprek Sambal Matah</h4>
            </a>
            {/* ... resep lainnya */}
          </>
        ) : (
          // PERBAIKAN: styles.emptyStateMessage -> "emptyStateMessage"
          <div className="emptyStateMessage">
            <i className="fas fa-book-open"></i>
            <p>Belum ada resep yang dibagikan</p>
            <span>Saat {isMyProfile ? 'Anda' : profile.name} membagikan resep, resep itu akan muncul di sini.</span>
          </div>
        )}
      </div>
    );
    
    const savedGrid = isMyProfile && (
      <div 
        // PERBAIKAN: styles.profileRecipeGrid -> "profileRecipeGrid", styles.hidden -> "hidden"
        className={`profileRecipeGrid ${!isSavedRecipesActive ? 'hidden' : ''}`} 
        id="grid-saved-recipes"
      >
        {/* PERBAIKAN: styles.profileRecipeCard -> "profileRecipeCard" */}
        <a href="#" className="profileRecipeCard">
          <img src="src/rendang.jpeg" alt="Rendang" />
          <h4>Rendang Padang Klasik</h4>
        </a>
        <a href="#" className="profileRecipeCard">
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
      // PERBAIKAN: styles.modalOverlay -> "modalOverlay", styles.modalActive -> "modalActive"
      <div className={`modalOverlay ${isEditModalOpen ? 'modalActive' : ''}`} id="edit-profile-modal">
        {/* PERBAIKAN: styles.modalContent -> "modalContent", styles.large -> "large" */}
        <div className={`modalContent large`}>
          {/* PERBAIKAN: styles.authForm -> "authForm" */}
          <form id="setup-form" className="authForm" onSubmit={(e) => { e.preventDefault(); /* Logic simpan */ setIsEditModalOpen(false); }}>
            {/* PERBAIKAN: styles.profileSetupTitle -> "profileSetupTitle" */}
            <h2 className="profileSetupTitle">Lengkapi Profil Anda</h2>

            {/* PERBAIKAN: styles.profilePicUploadArea -> "profilePicUploadArea" */}
            <div className="profilePicUploadArea">
              {/* PERBAIKAN: styles.profilePicLarge -> "profilePicLarge" */}
              <div className={`profilePicLarge profile-placeholder`}></div>
              {/* PERBAIKAN: styles.changePicButton -> "changePicButton" */}
              <label htmlFor="profile-pic" className="changePicButton">
                <i className="fas fa-camera"></i> Ubah Foto Profil
                <input
                  type="file"
                  id="profile-pic"
                  accept="image/*"
                  // PERBAIKAN: styles.hiddenFileInput -> "hiddenFileInput"
                  className="hiddenFileInput"
                />
              </label>
            </div>

            {/* PERBAIKAN: styles.formGroup -> "formGroup" */}
            <div className="formGroup">
              <label htmlFor="name">Nama</label>
              <input type="text" id="name" placeholder="Nama Lengkap Anda" />
            </div>
            {/* ... form groups lainnya ... */}
            {/* PERBAIKAN: styles.formGroup -> "formGroup" */}
            <div className="formGroup">
              <label htmlFor="bio">Bio Singkat</label>
              <textarea
                id="bio"
                rows="3"
                placeholder="Ceritakan sedikit tentang diri Anda..."
              ></textarea>
            </div>
            {/* PERBAIKAN: styles.formGroup -> "formGroup", styles.socialLinksGroup -> "socialLinksGroup" */}
            <div className={`formGroup socialLinksGroup`}>
              <label>Tambahkan Tautan (Opsional)</label>
              {/* PERBAIKAN: styles.socialInputWrapper -> "socialInputWrapper" */}
              <div className="socialInputWrapper">
                <i className="fab fa-tiktok"></i>
                <input type="url" id="link-tiktok" placeholder="Link profil TikTok Anda" />
              </div>
              {/* ... input sosial media lainnya ... */}
            </div>

            {/* PERBAIKAN: styles.modalActions -> "modalActions" */}
            <div className="modalActions">
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
      // PERBAIKAN: styles.modalOverlay -> "modalOverlay", styles.modalActive -> "modalActive"
      <div className={`modalOverlay ${isUnfollowModalOpen ? 'modalActive' : ''}`} id="unfollow-modal">
        {/* PERBAIKAN: styles.modalContent -> "modalContent" */}
        <div className="modalContent">
          <p>
            Apakah yakin mau berhenti mengikuti
            <strong id="modal-message-username"> {profile.username}</strong>?
          </p>
          {/* PERBAIKAN: styles.modalActions -> "modalActions" */}
          <div className="modalActions">
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
      
      {/* PERBAIKAN: styles.profileMain -> "profileMain" */}
      <section className="profileMain">
        {/* PERBAIKAN: styles.profileHeaderContainer -> "profileHeaderContainer" */}
        <div className="profileHeaderContainer">
          {/* Profile Top Bar */}
          {/* PERBAIKAN: styles.profileTopBar -> "profileTopBar" */}
          <div className="profileTopBar">
            {/* PERBAIKAN: styles.backButton -> "backButton" */}
            <button className="backButton" onClick={() => window.history.back()}>
              <i className="fas fa-arrow-left"></i>
            </button>
            {/* PERBAIKAN: styles.profileTopBarTitle -> "profileTopBarTitle" */}
            <div className="profileTopBarTitle">
              <strong>{isMyProfile ? 'Profil Saya' : 'Profil'}</strong>
              <span>{profile.username}</span>
            </div>
          </div>
          {/* PERBAIKAN: styles.profileCoverPhoto -> "profileCoverPhoto" */}
          <div className="profileCoverPhoto"></div>

          {/* Profile Details */}
          {/* PERBAIKAN: styles.profileDetails -> "profileDetails" */}
          <div className="profileDetails">
            {/* PERBAIKAN: styles.profilePicLarge -> "profilePicLarge" */}
            <div className="profilePicLarge" style={{ backgroundImage: `url('src/geprek.jpeg')` }}></div>
            {/* PERBAIKAN: styles.profileUserInfo -> "profileUserInfo" */}
            <div className="profileUserInfo">
              {/* PERBAIKAN: styles.profileNameLine -> "profileNameLine" */}
              <div className="profileNameLine">
                <h2>{profile.name}</h2>
                {/* PERBAIKAN: styles.profileStatsInline -> "profileStatsInline" */}
                <div className="profileStatsInline">
                  <strong>{formatCount(followerCount)}</strong> <span>Pengikut</span>
                </div>
              </div>
              <span>{profile.username}</span>
            </div>
            {renderActionButtons()}
          </div>

          {/* Profile Bio */}
          {/* PERBAIKAN: styles.profileBio -> "profileBio" */}
          <div className="profileBio">
            <p>{profile.bio}</p>
          </div>
        </div>
        
        {/* Profile Links */}
        {/* PERBAIKAN: styles.profileLinks -> "profileLinks" */}
        <div className="profileLinks">
          {/* PERBAIKAN: styles.profileLinkItem -> "profileLinkItem" */}
          <a href="#" className="profileLinkItem" target="_blank">
            <i className="fab fa-tiktok"></i>
            <span>TikTok</span>
          </a>
          {/* PERBAIKAN: styles.profileLinkItem -> "profileLinkItem" */}
          <a href="#" className="profileLinkItem" target="_blank">
            <i className="fab fa-instagram"></i>
            <span>Instagram</span>
          </a>
          {/* PERBAIKAN: styles.profileLinkItem -> "profileLinkItem" */}
          <a href="#" className="profileLinkItem" target="_blank">
            <i className="fab fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
          {/* PERBAIKAN: styles.profileLinkItem -> "profileLinkItem" */}
          <a href="#" className="profileLinkItem" target="_blank">
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