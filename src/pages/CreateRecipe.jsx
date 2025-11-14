<<<<<<< Updated upstream
=======
import React, { useState, useEffect } from 'react';


// --- Komponen Dinamis untuk Baris Input Bahan/Langkah ---
const DynamicInputRow = ({ placeholder, initialValue = '', onRemove, onChange, index, totalItems }) => {
  const isRemovable = totalItems > 1; // Hanya bisa dihapus jika ada lebih dari 1 item

  return (
    <div className="dynamic-input-row">
      <input
        type="text"
        placeholder={placeholder}
        value={initialValue}
        onChange={(e) => onChange(index, e.target.value)}
      />
      {isRemovable && (
        <button type="button" className="remove-item-btn" onClick={() => onRemove(index)}>
          &times;
        </button>
      )}
      {!isRemovable && (
        // Placeholder agar layout tetap konsisten saat hanya 1 item
        <div style={{ width: '46px', height: '46px', flexShrink: 0 }}></div> 
      )}
    </div>
  );
};

// --- Komponen Utama Halaman ---
const CreateRecipe = () => {
  // State untuk Bahan-Bahan
  const [ingredients, setIngredients] = useState(['']); // Mulai dengan 1 baris kosong
  // State untuk Langkah-Langkah
  const [steps, setSteps] = useState(['']); // Mulai dengan 1 baris kosong

  // --- Logic Dynamic List ---
  
  const handleAddItem = (setter, list) => {
    setter([...list, '']);
  };

  const handleRemoveItem = (setter, list, indexToRemove) => {
    setter(list.filter((_, index) => index !== indexToRemove));
  };

  const handleChangeItem = (setter, list, index, value) => {
    const newList = list.map((item, i) => (i === index ? value : item));
    setter(newList);
  };
  
  // Asumsi Komponen Header dan Footer diimpor
  const Header = () => <div>Header Aplikasi</div>;
  const Footer = () => <div>Footer Aplikasi</div>;

  const handleSubmit = (e) => {
      e.preventDefault();
      alert('Resep diterbitkan! (Fungsionalitas dummy)');
      // Logic pengiriman data ke backend akan diletakkan di sini
  };

  return (
    <div className="loggedin-body">
      <Header />
      
      <main className="container">
        <div className="create-recipe-container">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <div className="recipe-title-group">
                <button type="button" className="back-button" onClick={() => window.history.back()}>
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h1>Buat Resep Baru Anda</h1>
              </div>
              <p>
                Bagikan resep terbaik Anda kepada dunia dan inspirasi para CookConnectors lainnya!
              </p>
            </div>

            {/* === FOTO UTAMA RESEP === */}
            <div className="form-section">
              <h2>Foto Utama Resep</h2>
              <label htmlFor="recipe-photo-upload" className="upload-box">
                <i className="fas fa-camera"></i>
                <span>Klik untuk mengunggah foto (cth: .jpg, .png)</span>
              </label>
              <input
                type="file"
                id="recipe-photo-upload"
                className="hidden-file-input"
                accept="image/*"
              />
            </div>

            {/* === JUDUL & DESKRIPSI === */}
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="recipe-title">Judul Resep *</label>
                <input
                  type="text"
                  id="recipe-title"
                  placeholder="Cth: Ayam Geprek Sambal Matah"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipe-caption">Deskripsi Singkat (Caption)</label>
                <textarea
                  id="recipe-caption"
                  rows="4"
                  placeholder="Cth: Resep andalan keluarga yang pedasnya nagih!"
                ></textarea>
              </div>
            </div>

            {/* === DETAIL RESEP (Waktu, Porsi, Kesulitan) === */}
            <div className="form-section">
              <h2>Detail Resep</h2>
              <div className="form-group-flex">
                <div className="form-group">
                  <label htmlFor="recipe-time">Total Waktu</label>
                  <input type="text" id="recipe-time" placeholder="Cth: 30 Menit" />
                </div>
                <div className="form-group">
                  <label htmlFor="recipe-servings">Porsi</label>
                  <input type="text" id="recipe-servings" placeholder="Cth: 2 orang" />
                </div>
                <div className="form-group">
                  <label htmlFor="recipe-difficulty">Kesulitan</label>
                  <select id="recipe-difficulty">
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                  </select>
                </div>
              </div>
            </div>

            {/* === BAHAN-BAHAN (Dynamic Input) === */}
            <div className="form-section">
              <label>Bahan-Bahan *</label>
              <div id="ingredients-list" className="dynamic-input-list">
                {ingredients.map((item, index) => (
                  <DynamicInputRow
                    key={index}
                    index={index}
                    initialValue={item}
                    placeholder="Cth: 200gr Daging Ayam"
                    onRemove={() => handleRemoveItem(setIngredients, ingredients, index)}
                    onChange={(i, val) => handleChangeItem(setIngredients, ingredients, i, val)}
                    totalItems={ingredients.length}
                  />
                ))}
              </div>
              <button
                type="button"
                className="cta-button button-secondary"
                onClick={() => handleAddItem(setIngredients, ingredients)}
              >
                <i className="fas fa-plus"></i> Tambah Bahan
              </button>
            </div>

            {/* === LANGKAH-LANGKAH (Dynamic Input) === */}
            <div className="form-section">
              <label>Langkah-Langkah *</label>
              <div id="steps-list" className="dynamic-input-list">
                {steps.map((item, index) => (
                  <DynamicInputRow
                    key={index}
                    index={index}
                    initialValue={item}
                    placeholder="Cth: Panaskan minyak di wajan"
                    onRemove={() => handleRemoveItem(setSteps, steps, index)}
                    onChange={(i, val) => handleChangeItem(setSteps, steps, i, val)}
                    totalItems={steps.length}
                  />
                ))}
              </div>
              <button
                type="button"
                className="cta-button button-secondary"
                onClick={() => handleAddItem(setSteps, steps)}
              >
                <i className="fas fa-plus"></i> Tambah Langkah
              </button>
            </div>

            {/* === LINK VIDEO (Opsional) === */}
            <div className="form-section">
              <label>Link Video (Opsional)</label>

              <div className="input-with-icon">
                <i className="fab fa-youtube"></i>
                <input
                  type="url"
                  id="recipe-video-youtube"
                  placeholder="Cth: https://youtube.com/watch?v=..."
                />
              </div>

              <div className="input-with-icon">
                <i className="fab fa-tiktok"></i>
                <input
                  type="url"
                  id="recipe-video-tiktok"
                  placeholder="Cth: https://tiktok.com/@username/video/..."
                />
              </div>

              <div className="input-with-icon">
                <i className="fab fa-instagram"></i>
                <input
                  type="url"
                  id="recipe-video-instagram"
                  placeholder="Cth: https://instagram.com/p/..."
                />
              </div>
            </div>

            {/* === ACTIONS === */}
            <div className="form-actions">
              <a href="/feed" className="cta-button button-secondary">Batal</a>
              <button type="submit" className="cta-button">Terbitkan Resep</button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateRecipe;
>>>>>>> Stashed changes
