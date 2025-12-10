import React from "react";
import { Link } from "react-router-dom";
import "../styles/app.css";

import RecipeCard from "../components/RecipeCard";
import MemberCard from "../components/MemberCard";

import anggota1 from "../assets/anggota1.png";
import anggota2 from "../assets/anggota2.png";
import anggota3 from "../assets/anggota3.png";
import anggota4 from "../assets/anggota4.png";
import rendang from "../assets/rendang.jpeg";
import geprek from "../assets/geprek.jpeg";
import brownies from "../assets/brownies.jpeg";
import heroBgPlaceholder from "../assets/rendang.jpeg";

const featuredRecipes = [
  {
    id: 1,
    title: "Rendang Padang Klasik",
    meta: "Oleh: Budi",
    teaser: "Resep fancy restoran! Rugi kalau ga cobain...",
    likes: "12.4K",
    imageSrc: rendang,
    altText: "Gambar Rendang Padang Klasik",
  },
  {
    id: 2,
    title: "Ayam Geprek Sambal Matah",
    meta: "Oleh: Sari",
    teaser: "Resep cocok buat orang yang malas masak!...",
    likes: "8.1K",
    imageSrc: geprek,
    altText: "Gambar Ayam Geprek Sambal Matah",
  },
  {
    id: 3,
    title: "Brownies Kukus 3 Bahan",
    meta: "Oleh: Chef Yuni",
    teaser: "Pemula harus cobain biar skillnya meningkat!...",
    likes: "5.9K",
    imageSrc: brownies,
    altText: "Gambar Brownies Kukus 3 Bahan",
  },
];

const teamMembers = [
  { name: "Muhammad Adil Busra", role: "Ketua Proyek & Backend", photoSrc: anggota1, altText: "Foto Anggota Tim 1" },
  { name: "Leonard Auguste", role: "UI/UX, Frontend", photoSrc: anggota2, altText: "Foto Anggota Tim 2" },
  { name: "Kayla Andhara", role: "Frontend", photoSrc: anggota3, altText: "Foto Anggota Tim 3" },
  { name: "Jeconia Farica Sitorus", role: "UI/UX, Frontend", photoSrc: anggota4, altText: "Foto Anggota Tim 4" },
];

const LandingPageHeader = () => {
  return (
    <header className="main-header landing-header-green">
      <div className="container">
        <div className="navbar">
          <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logokecil.png" alt="Logo" style={{ width: '30px', height: 'auto' }} />
            CookConnect
          </Link>
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

export const SharedFooter = () => {
  return (
    <footer style={{ backgroundColor: '#f9f9f9', padding: '30px 0', borderTop: '1px solid #eee' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '0 20px', gap: '20px' }}>
        
        <div className="footer-socials" style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <a href="https://wa.me/081362533730" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#38761d', transition: '0.2s' }}>
            <i className="fab fa-whatsapp" style={{ fontSize: '2rem' }}></i>
          </a>
          <a href="https://instagram.com/lemarilama.preloved" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#38761d', transition: '0.2s' }}>
            <i className="fab fa-instagram" style={{ fontSize: '2rem' }}></i>
          </a>
          <a href="https://www.tiktok.com/@puttripaadaang?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#38761d', transition: '0.2s' }}>
            <i className="fab fa-tiktok" style={{ fontSize: '2rem' }}></i>
          </a>
        </div>

        <div className="footer-text" style={{ textAlign: 'right' }}>
          <p style={{ color: '#777', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
            &copy; 2025 CookConnect.<br />
            Dikembangkan untuk Mata Kuliah Pemrograman Web.
          </p>
        </div>

      </div>
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
            <p className="subtitle">Temukan inspirasi memasak baru...</p>
            <Link to="/login" className="cta-button hero-cta-button">Coba Sekarang!</Link>
          </div>
          <div
            className="hero-illustration"
            style={{
              backgroundImage: `url('https://i.pinimg.com/1200x/bd/e5/12/bde5123b32122d235c5fc8c3fb367417.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </section>

        <section id="preview" className="preview-section container">
          <div className="recipe-grid">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} title={recipe.title} meta={recipe.meta} teaser={recipe.teaser} likes={recipe.likes} imageSrc={recipe.imageSrc} altText={recipe.altText} />
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section container">
          <div className="contact-layout" style={{ display: 'block', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div className="contact-details">
              <h2 style={{ fontSize: '2.5rem', color: '#38761d', marginBottom: '10px' }}>Kami Siap Membantu</h2>
              <p className="contact-sub-text" style={{ marginBottom: '40px' }}>
                Punya pertanyaan, masukan, atau butuh bantuan? Tim kami siap melayani Anda. Silakan hubungi kami melalui media sosial di bawah.
              </p>

              <div className="contact-social-list" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  gap: '20px' 
              }}>
                
                <a href="https://wa.me/081362533730" target="_blank" rel="noopener noreferrer" 
                   style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', fontSize: '1.2rem', color: '#555', padding: '10px 20px', borderRadius: '10px', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', width: 'fit-content', minWidth: '250px' }}>
                  <i className="fab fa-whatsapp" style={{ fontSize: '1.8rem', color: '#25D366' }}></i>
                  <span style={{ fontWeight: '500' }}>WhatsApp</span>
                </a>

                <a href="https://instagram.com/lemarilama.preloved" target="_blank" rel="noopener noreferrer" 
                   style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', fontSize: '1.2rem', color: '#555', padding: '10px 20px', borderRadius: '10px', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', width: 'fit-content', minWidth: '250px' }}>
                  <i className="fab fa-instagram" style={{ fontSize: '1.8rem', color: '#E1306C' }}></i>
                  <span style={{ fontWeight: '500' }}>@cookconnect</span>
                </a>

                <a href="https://www.tiktok.com/@puttripaadaang?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" 
                   style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', fontSize: '1.2rem', color: '#555', padding: '10px 20px', borderRadius: '10px', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', width: 'fit-content', minWidth: '250px' }}>
                  <i className="fab fa-tiktok" style={{ fontSize: '1.8rem', color: '#000' }}></i>
                  <span style={{ fontWeight: '500' }}>@cookconnect</span>
                </a>

              </div>
            </div>
          </div>
        </section>

        <section id="team" className="team-section container">
          <h2>Kenalan dengan Tim Pengembang Kami</h2>
          <div className="team-member-grid">
            {teamMembers.map((member, index) => (
              <MemberCard key={index} name={member.name} role={member.role} photoSrc={member.photoSrc} altText={member.altText} />
            ))}
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}

export default LandingPage;