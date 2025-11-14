// src/pages/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // 👈 Import CSS murni di sini

// Anda perlu memastikan path gambar benar
import heroBg from '../assets/hero-bg.jpg'; 
import recipeImg1 from '../assets/recipe-placeholder-1.jpg'; 
import recipeImg2 from '../assets/recipe-placeholder-2.jpg';
import recipeImg3 from '../assets/recipe-placeholder-3.jpg';
import teamMember1 from '../assets/team-member-1.jpg';
import teamMember2 from '../assets/team-member-2.jpg';
import teamMember3 from '../assets/team-member-3';
import teamMember4 from '../assets/team-member-4.jpg';

// Header Komponen (Menggunakan String Kelas CSS)
const LandingPageHeader = () => {
  return (
    <header className="mainHeader">
      <div className="container">
        <div className="logo">
          <Link to="/">CookConnect</Link>
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#preview">Preview</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#team">Team</a></li>
            <li><Link to="/login" className="loginButton">Login</Link></li>
            <li><Link to="/register" className="registerButton">Register</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Footer Komponen (Menggunakan String Kelas CSS)
const LandingPageFooter = () => {
  return (
    <footer className="mainFooter">
      <div className="container">
        <div className="footerContent">
          <p>&copy; 2025 CookConnect. Developed for Web Programming Class.</p>
          <ul className="socialLinks">
            <li><a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a></li>
            <li><a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#" aria-label="TikTok"><i className="fab fa-tiktok"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};


function LandingPage() {
  return (
    <div className="body">
      <LandingPageHeader />

      <main>
        <section id="home" className="heroSection" style={{ backgroundImage: `url(${heroBg})` }}>
          <div className="container">
            <div className="heroContent">
              <h1>CookConnect:</h1>
              <h2>Berbagi Resep Terbaik Anda</h2>
              <p>Temukan inspirasi memasak baru dan jalin koneksi dengan para pecinta kuliner dari seluruh dunia, dalam platform sosial media resep yang modern.</p>
              <Link to="/register" className="ctaButton">Gabung Sekarang</Link>
            </div>
          </div>
        </section>

        <section id="preview" className="section previewSection">
          <div className="container">
            <h2>Intip Resep Pilihan Kami</h2>
            <div className="recipeGrid">
              
              <div className="recipeCard">
                <img src={recipeImg1} alt="Rendang Padang Klasik" />
                <div className="recipeCardContent">
                  <h3>Rendang Padang Klasik</h3>
                  <p>Resep *fancy* restoran! Rugi kalau ga cobain, rahasia bumbu leluhur terkuak di sini!</p>
                </div>
              </div>
              <div className="recipeCard">
                <img src={recipeImg2} alt="Ayam Geprek Sambal Matah" />
                <div className="recipeCardContent">
                  <h3>Ayam Geprek Sambal Matah</h3>
                  <p>Resep cocok buat orang yang malas masak! Hanya butuh 15 menit, pedasnya nagih!</p>
                </div>
              </div>
              <div className="recipeCard">
                <img src={recipeImg3} alt="Brownies Kukus 3 Bahan" />
                <div className="recipeCardContent">
                  <h3>Brownies Kukus 3 Bahan</h3>
                  <p>Pemula harus cobain biar skill-nya meningkat! Dessert viral yang pasti berhasil.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contactSection">
          <div className="container">
            <div className="contactContent">
              <h2>We're Here to Help</h2>
              <p>Punya pertanyaan, masukan, atau butuh bantuan? Tim kami siap melayani Anda.</p>
              <form className="contactForm">
                <input type="text" placeholder="Nama Depan" required />
                <input type="text" placeholder="Nama Belakang" required />
                <input type="email" placeholder="Email Anda" required />
                <textarea placeholder="Pesan Anda" required></textarea>
                <button type="submit" className="ctaButton">Kirim Pesan</button>
              </form>
            </div>
          </div>
        </section>

        <section id="team" className="section teamSection">
          <div className="container">
            <h2>Meet Our Development Team</h2>
            <p>Website CookConnect ini dikembangkan sebagai tugas mata kuliah Pemrograman Web oleh tim kami.</p>
            <div className="teamGrid">
              <div className="teamMember">
                <img src={teamMember1} alt="Anggota Tim 1" />
                <h3>Nama Anggota 1</h3>
                <p>Project Manager / Frontend Lead</p>
              </div>
              <div className="teamMember">
                <img src={teamMember2} alt="Anggota Tim 2" />
                <h3>Nama Anggota 2</h3>
                <p>UI/UX</p>
              </div>
              <div className="teamMember">
                <img src={teamMember3} alt="Anggota Tim 3" />
                <h3>Nama Anggota 3</h3>
                <p>CSS</p>
              </div>
              <div className="teamMember">
                <img src={teamMember4} alt="Anggota Tim 4" />
                <h3>Nama Anggota 4</h3>
                <p>JavaScript</p>
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