import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedFooter } from './LandingPage'; 

const TermsPrivacy = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page-body">
      <header className="login-header">
        <div className="container">
          <div className="logo" style={{cursor:'pointer', color:'#38761d', fontSize:'1.5rem', fontWeight:'800'}} onClick={() => navigate('/')}>
             CookConnect
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h1 style={{ color: '#38761d', marginBottom: '20px' }}>Syarat Ketentuan & Kebijakan Privasi</h1>
            
            <h3>1. Pendahuluan</h3>
            <p>Selamat datang di CookConnect. Dengan menggunakan platform ini, Anda setuju untuk mematuhi aturan yang berlaku.</p>
            
            <h3>2. Privasi Pengguna</h3>
            <p>Kami menghargai privasi Anda. Data seperti nama, email, dan foto profil digunakan semata-mata untuk keperluan fungsionalitas aplikasi.</p>
            
            <h3>3. Konten Pengguna</h3>
            <p>Pengguna bertanggung jawab atas resep dan foto yang diunggah. Dilarang mengunggah konten yang mengandung SARA atau pornografi.</p>
            
            <h3>4. Perubahan Ketentuan</h3>
            <p>Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>

            <button onClick={() => navigate(-1)} className="cta-button" style={{ marginTop: '30px' }}>
                Kembali
            </button>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
};

export default TermsPrivacy;