import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 

import anggota1 from '../assets/anggota1.jpeg'; 
import anggota2 from '../assets/anggota2.jpeg'; 
import anggota3 from '../assets/anggota3.jpeg';
import anggota4 from '../assets/anggota4.jpeg';
import rendang from '../assets/rendang.jpeg';
import geprek from '../assets/geprek.jpeg';   
import brownies from '../assets/brownies.jpeg'; 
import heroBgPlaceholder from '../assets/rendang.jpeg'; 

const LandingPageHeader = () => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <Link to="/">CookConnect</Link>
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#preview">Featured Recipes</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#team">Team</a></li>
          </ul>
          <Link to="/login" className="cta-button">Login / Register</Link>
        </nav>
      </div>
    </header>
  );
};

const LandingPageFooter = () => {
  return (
    <footer>
      <p>&copy; 2025 CookConnect. Developed for Web Programming Class.</p>
    </footer>
  );
};


function LandingPage() {
  return (
    <div>
      <LandingPageHeader />

      <main>
        <section id="home" className="hero-section">
          <div className="hero-text-content">
            <h1>masak2:</h1>
            <h2>Berbagi Resep Terbaik Anda</h2>
            <p className="subtitle">
              Temukan inspirasi memasak baru dan jalin koneksi dengan para pecinta
              kuliner dari seluruh dunia, dalam platform sosial media resep yang modern.
            </p>
          </div>
          <div className="hero-illustration" style={{ backgroundImage: `url(${heroBgPlaceholder})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
             {}
          </div>
        </section>

        <section id="preview" className="preview-section container">
          <div className="recipe-grid">
            
            <div className="recipe-card">
              <img src={rendang} alt="Gambar Rendang Padang Klasik" className="recipe-image" />
              <div className="recipe-like-badge">
                <i className="fas fa-heart icon-like"></i> 12.4K
              </div>
              <h4 className="recipe-title">Rendang Padang Klasik</h4>
              <p className="recipe-meta">Oleh: Budi</p>
              <p className="recipe-teaser">
                "Resep fancy restoran! Rugi kalau ga cobain, rahasia bumbu leluhur terkuak di sini!"
              </p>
              <a href="#" className="read-more">Lihat Detail &raquo;</a>
            </div>

            <div className="recipe-card">
              <img src={geprek} alt="Gambar Ayam Geprek Sambal Matah" className="recipe-image" />
              <div className="recipe-like-badge">
                <i className="fas fa-heart icon-like"></i> 8.1K
              </div>
              <h4 className="recipe-title">Ayam Geprek Sambal Matah</h4>
              <p className="recipe-meta">Oleh: Sari</p>
              <p className="recipe-teaser">
                "Resep cocok buat orang yang malas masak! Hanya butuh 15 menit, pedasnya nagih!"
              </p>
              <a href="#" className="read-more">Lihat Detail &raquo;</a>
            </div>

            <div className="recipe-card">
              <img src={brownies} alt="Gambar Brownies Kukus 3 Bahan" className="recipe-image" />
              <div className="recipe-like-badge">
                <i className="fas fa-heart icon-like"></i> 5.9K
              </div>
              <h4 className="recipe-title">Brownies Kukus 3 Bahan</h4>
              <p className="recipe-meta">Oleh: Chef Yuni</p>
              <p className="recipe-teaser">
                "Pemula harus cobain biar skillnya meningkat! Dessert viral yang pasti berhasil."
              </p>
              <a href="#" className="read-more">Lihat Detail &raquo;</a>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section container">
          <div className="contact-layout">
            <div className="contact-details">
              <h2>We're Here to Help</h2>
              <p className="contact-sub-text">
                Punya pertanyaan, masukan, atau butuh bantuan? Tim kami siap melayani Anda.
              </p>

              <div className="contact-info-block social-icons">
                <a href="#" target="_blank" aria-label="WhatsApp CookConnect"><i className="fab fa-whatsapp"></i></a>
                <a href="#" target="_blank" aria-label="Instagram CookConnect"><i className="fab fa-instagram"></i></a>
                <a href="#" target="_blank" aria-label="TikTok CookConnect"><i className="fab fa-tiktok"></i></a>
              </div>
            </div>

            <div className="contact-form-container">
              <form action="#" method="POST" className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="first-name">First Name *</label>
                    <input type="text" id="first-name" name="first-name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last-name">Last Name *</label>
                    <input type="text" id="last-name" name="last-name" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Leave us a message...</label>
                  <textarea id="message" name="message" rows="4"></textarea>
                </div>
                <button type="submit" className="cta-button form-submit-button">Submit Message</button>
              </form>
            </div>
          </div>
        </section>

        <section id="team" className="team-section container">
          <h2>Meet Our Development Team</h2>
          <p>
            Website CookConnect ini dikembangkan sebagai tugas mata kuliah Pemrograman Web oleh tim kami.
          </p>

          <div className="team-member-grid">
            <div className="team-member-card">
              <img src={anggota1} alt="Foto Anggota Tim 1" className="member-photo" />
              <div className="member-card-content">
                <h4>Nama Anggota 1</h4>
                <p className="role">Project Manager / Frontend Lead</p>
              </div>
            </div>

            <div className="team-member-card">
              <img src={anggota2} alt="Foto Anggota Tim 2" className="member-photo" />
              <div className="member-card-content">
                <h4>Nama Anggota 2</h4>
                <p className="role">UI/UX</p>
              </div>
            </div>

            <div className="team-member-card">
              <img src={anggota3} alt="Foto Anggota Tim 3" className="member-photo" />
              <div className="member-card-content">
                <h4>Nama Anggota 3</h4>
                <p className="role">CSS</p>
              </div>
            </div>

            <div className="team-member-card">
              <img src={anggota4} alt="Foto Anggota Tim 4" className="member-photo" />
              <div className="member-card-content">
                <h4>Nama Anggota adil</h4>
                <p className="role">JavaScript</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingPageFooter />
    </div>
  );
}

export default LandingPage;