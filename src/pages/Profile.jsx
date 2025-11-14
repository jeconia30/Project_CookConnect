import React from "react";

const userProfile = {
  name: "Jecónia Farica Sitorus",
  email: "jeconia@gmail.com",
  alamat: "Medan, Sumatera Utara",
  bio: "Saya seorang mahasiswa yang suka mempelajari pemrograman, desain, dan pengembangan aplikasi modern.",
  avatar: "https://i.pravatar.cc/150"
};

const Profile = () => {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      padding: "40px",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>
      
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          My Profile
        </h2>

        {/* Foto Profil */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={userProfile.avatar}
            alt="Profile"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #0D6EFD"
            }}
          />
        </div>

        {/* Informasi Profil */}
        <div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Nama:</strong>
            <p>{userProfile.name}</p>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong>Email:</strong>
            <p>{userProfile.email}</p>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong>Alamat:</strong>
            <p>{userProfile.alamat}</p>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong>Bio:</strong>
            <p>{userProfile.bio}</p>
          </div>
        </div>

        {/* Tombol Edit */}
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <button style={{
            padding: "12px 25px",
            backgroundColor: "#0D6EFD",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}>
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
