import React from "react";
// Pastikan path gambarnya benar sesuai folder projectmu
import ayamGeprek from "../assets/geprek.jpeg"; 
import { FaArrowLeft, FaRegHeart, FaRegComment, FaShare, FaRegBookmark, FaClock, FaUtensils, FaStar, FaShoppingCart, FaListUl, FaTiktok, FaYoutube, FaInstagram, FaPaperPlane } from "react-icons/fa";

const RecipeDetail = () => {
  return (
    <div className="detail-container">
      {/* HEADER: Back Button & Title */}
      <header className="recipe-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <h1 className="detail-title">Ayam Geprek Sambal Matah</h1>
        
        {/* Author Section */}
        <div className="author-box">
          <img
            src="https://i.pravatar.cc/150?img=5"
            alt="avatar"
            className="author-avatar"
          />
          <div className="author-info">
            <div className="author-top">
              <strong>Sari (Contoh)</strong>
              <span className="author-handle">@sari_masak</span>
              <button className="follow-btn">Ikuti</button>
            </div>
            <p className="time-posted">Diposkan 2 jam lalu</p>
          </div>
        </div>
      </header>

      {/* HERO SECTION: Image & Actions */}
      <section className="hero-section">
        <img src={ayamGeprek} alt="Ayam Geprek" className="detail-image" />
        
        <div className="action-bar">
          <div className="action-left">
            <button className="action-btn"><FaRegHeart className="icon-red" /> 8.1K Suka</button>
            <button className="action-btn"><FaRegComment /> 120 Komentar</button>
          </div>
          <div className="action-right">
            <button className="action-btn"><FaShare /> Bagikan</button>
            <button className="action-btn"><FaRegBookmark className="icon-green" /> Disimpan</button>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* DESCRIPTION */}
      <p className="recipe-description">
        Ini dia resep ayam geprek andalanku! Resep cocok buat orang yang malas masak! 
        Hanya butuh 15 menit, pedasnya nagih! #ayamgeprek #sambalmatah #masakcepat
      </p>

      {/* INFO CARD (Time, Portion, Difficulty) */}
      <div className="info-card">
        <div className="info-item">
          <FaClock className="info-icon" />
          <span className="info-label">Total Waktu:</span>
          <span className="info-value">15 Menit</span>
        </div>
        <div className="info-item border-x">
          <FaUtensils className="info-icon" />
          <span className="info-label">Porsi:</span>
          <span className="info-value">2 orang</span>
        </div>
        <div className="info-item">
          <FaStar className="info-icon" />
          <span className="info-label">Kesulitan:</span>
          <span className="info-value">Mudah</span>
        </div>
      </div>

      {/* MAIN CONTENT GRID (Ingredients & Steps) */}
      <div className="recipe-content-grid">
        {/* Left Column: Ingredients */}
        <div className="ingredients-section">
          <h2 className="section-title"><FaShoppingCart className="section-icon" /> Bahan-Bahan</h2>
          <ul className="ingredient-list">
            <li>2 potong ayam goreng (tepung)</li>
            <li>10 buah cabai rawit merah</li>
            <li>5 siung bawang merah</li>
            <li>2 batang sereh (ambil bagian putih)</li>
            <li>4 lembar daun jeruk (buang tulang)</li>
            <li>1/2 sdt terasi bakar</li>
            <li>Garam dan gula secukupnya</li>
            <li>5 sdm minyak kelapa panas</li>
          </ul>
        </div>

        {/* Right Column: Steps */}
        <div className="steps-section">
          <h2 className="section-title"><FaListUl className="section-icon" /> Langkah-Langkah</h2>
          <div className="step-list">
            <div className="step-item">
              <h3>1. Siapkan Sambal:</h3>
              <p>Ulek kasar cabai, bawang merah, dan terasi. Jangan terlalu halus.</p>
            </div>
            <div className="step-item">
              <h3>2. Iris Bumbu:</h3>
              <p>Iris tipis sereh dan daun jeruk. Campur ke dalam ulekan cabai.</p>
            </div>
            <div className="step-item">
              <h3>3. Siram Minyak:</h3>
              <p>Panaskan minyak kelapa (harus sangat panas). Siramkan langsung ke atas campuran sambal. Aduk rata.</p>
            </div>
            <div className="step-item">
              <h3>4. Geprek Ayam:</h3>
              <p>Ambil ayam goreng tepung yang sudah siap, letakkan di atas cobek.</p>
            </div>
            <div className="step-item">
              <h3>5. Sajikan:</h3>
              <p>Geprek atau tekan ayam menggunakan ulekan hingga sedikit hancur dan tercampur dengan sambal. Sajikan segera.</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* VIDEO SECTION */}
      <section className="video-section">
        <h2 className="section-title">🎥 Tonton Video Resep</h2>
        <div className="video-buttons">
          <button className="vid-btn tiktok"><FaTiktok /> Tonton di TikTok</button>
          <button className="vid-btn youtube"><FaYoutube /> Tonton di YouTube</button>
          <button className="vid-btn instagram"><FaInstagram /> Tonton di Instagram</button>
        </div>
      </section>

      <hr className="divider" />

      {/* COMMENTS SECTION */}
      <section className="comments-section">
        <h2 className="section-title"><FaRegComment className="section-icon" /> 10 Komentar</h2>
        
        <div className="comment-input-area">
          <div className="comment-avatar placeholder"></div>
          <input type="text" placeholder="Tulis komentar Anda..." className="comment-input" />
          <button className="send-btn">Kirim</button>
        </div>

        <div className="comments-list">
          {/* Mock Comment 1 */}
          <div className="comment-item">
            <div className="comment-avatar bg-gray"></div>
            <div className="comment-text">
              <strong>@budi_rendang</strong>
              <p>Wah, keliatannya pedes banget! Jadi lapar!</p>
              <span className="comment-time">2 jam lalu</span>
            </div>
          </div>
          {/* Mock Comment 2 */}
          <div className="comment-item">
            <div className="comment-avatar bg-gray"></div>
            <div className="comment-text">
              <strong>@chef_yuni</strong>
              <p>Tips: minyaknya harus beneran panas biar wangi serehnya keluar. Mantap resepnya!</p>
              <span className="comment-time">1 jam lalu</span>
            </div>
          </div>
          {/* Mock Comment 3 */}
          <div className="comment-item">
            <div className="comment-avatar bg-gray"></div>
            <div className="comment-text">
              <strong>@dapur_ina</strong>
              <p>Tips: Ini sambal matahnya disiram minyak panas biasa atau minyak kelapa, ya?</p>
              <span className="comment-time">1 jam lalu</span>
            </div>
          </div>
          {/* Mock Comment 4 */}
          <div className="comment-item">
            <div className="comment-avatar bg-gray"></div>
            <div className="comment-text">
              <strong>@resep_simple</strong>
              <p>Tips: Keliatannya gampang, weekend ini fix coba!</p>
              <span className="comment-time">55 menit lalu</span>
            </div>
          </div>
          {/* Mock Comment 5 */}
          <div className="comment-item">
            <div className="comment-avatar bg-gray"></div>
            <div className="comment-text">
              <strong>@sambal_lover</strong>
              <p>Tips: Auto ngiler liat sambelnya... 🤤</p>
              <span className="comment-time">48 menit lalu</span>
            </div>
          </div>
          {/* Mock Comment 6 */}
          <div className="comment-item">
            <div className="comment-avatar bg-gray"></div>
            <div className="comment-text">
              <strong>@nasgor_bang_rt</strong>
              <p>Tips: Mantap! Lebih nendang lagi kalau ayamnya digeprek beneran sampe ancur.</p>
              <span className="comment-time">30 menit lalu</span>
            </div>
          </div>
          {/* Mock Comment 7 */}
          <div className="comment-item">
            <div className="comment-avatar bg-gray"></div>
            <div className="comment-text">
              <strong>@foodie_jakarta</strong>
              <p>Tips: Udah recook! Enak banget, resepnya anti gagal. Thanks, Sari!</p>
              <span className="comment-time">20 menit lalu</span>
            </div>
          </div>
          {/* Mock Comment 8 */}
          <div className="comment-item">
            <div className="comment-avatar bg-gray"></div>
            <div className="comment-text">
              <strong>@belajar_baking</strong>
              <p>Tips: Walaupun biasanya baking, jadi pengen coba yang pedes-pedes hehe.</p>
              <span className="comment-time">15 menit lalu</span>
            </div>
          </div>
          {/* Mock Comment 9 */}
          <div className="comment-item">
            <div className="comment-avatar bg-gray"></div>
            <div className="comment-text">
              <strong>@anak_kost_survive</strong>
              <p>Tips: Bisa jadi menu andalan akhir bulan nih. Save dulu!</p>
              <span className="comment-time">10 menit lalu</span>
            </div>
          </div>
          {/* Mock Comment 10 */}
          <div className="comment-item">
            <div className="comment-avatar bg-gray"></div>
            <div className="comment-text">
              <strong>@mama_muda_masak</strong>
              <p>Tips: Serehnya opsional gak ya? Anakku kurang suka.</p>
              <span className="comment-time">Baru saja</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default RecipeDetail;
