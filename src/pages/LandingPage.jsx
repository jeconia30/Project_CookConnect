import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 

import RecipeCard from '../components/RecipeCard'; 
import MemberCard from '../components/MemberCard'; 

import anggota1 from '../assets/anggota1.jpeg'; 
import anggota2 from '../assets/anggota2.jpeg'; 
import anggota3 from '../assets/anggota3.jpeg';
import anggota4 from '../assets/anggota4.jpeg';
import rendang from '../assets/rendang.jpeg';
import geprek from '../assets/geprek.jpeg';   
import brownies from '../assets/brownies.jpeg'; 
import heroBgPlaceholder from '../assets/rendang.jpeg'; 

const featuredRecipes = [
    { 
        id: 1, 
        title: "Rendang Padang Klasik", 
        meta: "Oleh: Budi", 
        teaser: "Resep fancy restoran! Rugi kalau ga cobain, rahasia bumbu leluhur terkuak di sini!", 
        likes: "12.4K", 
        imageSrc: rendang, 
        altText: "Gambar Rendang Padang Klasik" 
    },
    { 
        id: 2, 
        title: "Ayam Geprek Sambal Matah", 
        meta: "Oleh: Sari", 
        teaser: "Resep cocok buat orang yang malas masak! Hanya butuh 15 menit, pedasnya nagih!", 
        likes: "8.1K", 
        imageSrc: geprek, 
        altText: "Gambar Ayam Geprek Sambal Matah" 
    },
    { 
        id: 3, 
        title: "Brownies Kukus 3 Bahan", 
        meta: "Oleh: Chef Yuni", 
        teaser: "Pemula harus cobain biar skillnya meningkat! Dessert viral yang pasti berhasil.", 
        likes: "5.9K", 
        imageSrc: brownies, 
        altText: "Gambar Brownies Kukus 3 Bahan" 
    },
];

const teamMembers = [
    { name: "Nama Anggota 1", role: "Manajer Proyek / Ketua Frontend", photoSrc: anggota1, altText: "Foto Anggota Tim 1" },
    { name: "Nama Anggota 2", role: "UI/UX", photoSrc: anggota2, altText: "Foto Anggota Tim 2" },
    { name: "Nama Anggota 3", role: "CSS", photoSrc: anggota3, altText: "Foto Anggota Tim 3" },
    { name: "Nama Anggota adil", role: "JavaScript", photoSrc: anggota4, altText: "Foto Anggota Tim 4" },
];

const LandingPageHeader = () => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <Link to="/">CookConnect</Link>
          </div>
          <nav>
            <ul className="nav-links">
              <li><a href="#home">Beranda</a></li>
              <li><a href="#preview">Resep Unggulan</a></li>
              <li><a href="#contact">Kontak</a></li>
              <li><a href="#team">Tim</a></li>
            </ul>
          </nav>
          <Link to="/login" className="cta-button">Masuk / Daftar</Link>
        </div>
      </div>
    </header>
  );
};

const LandingPageFooter = () => {
  return (
    <footer>
      <p>&copy; 2025 CookConnect. Dikembangkan untuk Mata Kuliah Pemrograman Web.</p>
    </footer>
  );
};


function LandingPage() {
  return (
    <div>
      <LandingPageHeader />

      <main className="main-content-wrapper">
        <section id="home" className="hero-section container">
          <div className="hero-text-content">
            <h1>CookConnect:</h1> 
            <h2>Berbagi Resep Terbaik Anda</h2>
            <p className="subtitle">
              Temukan inspirasi memasak baru dan jalin koneksi dengan para pecinta
              kuliner dari seluruh dunia, dalam platform sosial media resep yang modern.
            </p>
            <Link to="/login" className="cta-button hero-cta-button">Coba Sekarang!</Link>
          </div>
          <div className="hero-illustration" style={{ backgroundImage: `url(${heroBgPlaceholder})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
             
          </div>
        </section>

        <section id="preview" className="preview-section container">
          <div className="recipe-grid">
            {featuredRecipes.map(recipe => (
                <RecipeCard 
                    key={recipe.id}
                    title={recipe.title}
                    meta={recipe.meta}
                    teaser={recipe.teaser}
                    likes={recipe.likes}
                    imageSrc={recipe.imageSrc}
                    altText={recipe.altText}
                />
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section container">
          <div className="contact-layout">
            <div className="contact-details">
              <h2>Kami Siap Membantu</h2>
              <p className="contact-sub-text">
                Punya pertanyaan, masukan, atau butuh bantuan? Tim kami siap melayani Anda.
              </p>

              <div className="contact-info-block social-icons">
                <a href="https://wa.me/081362533730" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp CookConnect"><i className="fab fa-whatsapp"></i></a>
                <a href="https://instagram.com/lemarilama.preloved" target="_blank" rel="noopener noreferrer" aria-label="Instagram CookConnect"><i className="fab fa-instagram"></i></a>
                <a href="https://www.tiktok.com/@puttripaadaang?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" aria-label="TikTok CookConnect"><i className="fab fa-tiktok"></i></a>
              </div>
            </div>

            <div className="contact-form-container">
              <form action="#" method="POST" className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="first-name">Nama Depan *</label>
                    <input type="text" id="first-name" name="first-name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last-name">Nama Belakang *</label>
                    <input type="text" id="last-name" name="last-name" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Tulis pesan Anda...</label>
                  <input type="text" id="message" name="message" />
                </div>
                <button type="submit" className="cta-button form-submit-button">Kirim Pesan</button>
              </form>
            </div>
          </div>
        </section>

        <section id="team" className="team-section container">
          <h2>Kenalan dengan Tim Pengembang Kami</h2>
          <p>
            Website CookConnect ini dikembangkan sebagai tugas mata kuliah Pemrograman Web oleh tim kami.
          </p>

          <div className="team-member-grid">
            {teamMembers.map((member, index) => (
                <MemberCard 
                    key={index}
                    name={member.name}
                    role={member.role}
                    photoSrc={member.photoSrc}
                    altText={member.altText}
                />
            ))}
          </div>
        </section>
      </main>

      <LandingPageFooter />
    </div>
  );
}

export default LandingPage;