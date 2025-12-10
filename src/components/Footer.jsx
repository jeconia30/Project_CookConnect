import React from 'react';
import '../styles/components/Footer.css'; 

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-content">
        {/* BAGIAN KIRI: Ikon Sosial Media */}
        <div className="footer-socials">
          <a 
            href="https://wa.me/628123456789" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a 
            href="https://tiktok.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="TikTok"
          >
            <i className="fab fa-tiktok"></i>
          </a>
        </div>

        {/* BAGIAN KANAN: Teks Copyright */}
        <div className="footer-text">
          <p>&copy; 2025 CookConnect.</p>
          <p>Dikembangkan untuk Mata Kuliah Pemrograman Web.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;