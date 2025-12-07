import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { uploadRecipeImage } from "../services/uploadService"; 
import "../styles/app.css";

function CreateRecipe() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk gambar
  const [uploadingImage, setUploadingImage] = useState(false);
  const [recipeImage, setRecipeImage] = useState(null); 
  const [recipeImageUrl, setRecipeImageUrl] = useState(null); 

  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);

  const [recipeInfo, setRecipeInfo] = useState({
    title: "",
    shortDescription: "",
    linkYoutube: "",
    linkTiktok: "",
    linkInstagram: "",
  });

  const [details, setDetails] = useState({
    totalTime: "",
    servingSize: "",
    difficulty: "",
  });

  // --- HANDLERS ---
  const handleRecipeInfoChange = (e) => setRecipeInfo({ ...recipeInfo, [e.target.name]: e.target.value });
  const handleDetailChange = (e) => setDetails({ ...details, [e.target.name]: e.target.value });
  
  const handleIngredientChange = (index, value) => {
    const newIng = [...ingredients]; newIng[index] = value; setIngredients(newIng);
  };
  const handleStepChange = (index, value) => {
    const newSteps = [...steps]; newSteps[index] = value; setSteps(newSteps);
  };
  
  const handleAddIngredient = () => setIngredients([...ingredients, ""]);
  const handleAddStep = () => setSteps([...steps, ""]);
  
  const handleDeleteIngredient = (index) => {
    if (ingredients.length > 1) setIngredients(ingredients.filter((_, i) => i !== index));
  };
  const handleDeleteStep = (index) => {
    if (steps.length > 1) setSteps(steps.filter((_, i) => i !== index));
  };

  // --- LOGIKA UPLOAD GAMBAR ---
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setRecipeImage(file);
    setUploadingImage(true);
    try {
      const result = await uploadRecipeImage(file);
      setRecipeImageUrl(result.url); 
      console.log('Gambar sukses diupload:', result.url);
    } catch (error) {
      console.error('Gagal upload gambar:', error);
      alert('Gagal mengupload gambar. Silakan coba lagi.');
      setRecipeImage(null);
    } finally {
      setUploadingImage(false);
    }
  };

  // --- SUBMIT RESEP ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("Sesi habis. Silakan login ulang.");
      navigate("/login");
      return;
    }

    if (!recipeImageUrl) {
      alert("Harap tunggu upload gambar selesai atau pilih gambar terlebih dahulu.");
      setIsLoading(false);
      return;
    }

    const finalIngredients = ingredients.filter((item) => item.trim() !== "");
    const finalSteps = steps.filter((step) => step.trim() !== "");

    try {
      // NOTE: Saat ini backend belum menyimpan link sosmed secara terpisah di DB.
      // Jika ingin menyimpannya, kita bisa gabungkan ke deskripsi atau update backend nanti.
      // Untuk sekarang, kita kirim apa adanya sesuai struktur backend yang aktif.
      
      const payload = {
        title: recipeInfo.title,
        description: recipeInfo.shortDescription,
        image_url: recipeImageUrl,
        ingredients: finalIngredients,
        steps: finalSteps,
        total_time: parseInt(details.totalTime) || 0,
        servings: parseInt(details.servingSize) || 0,
        difficulty: details.difficulty,
      };

      await api.post("/recipes", payload);

      alert("Resep berhasil diterbitkan!");
      navigate("/feed");
    } catch (error) {
      console.error("Error Create Recipe:", error);
      alert("Gagal menerbitkan resep: " + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Batalkan pembuatan resep?")) navigate("/feed");
  };

  return (
    <div className="form-body">
      <div className="form-container">
        <div className="form-header">
          <span className="back-arrow" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>←</span>
          <div className="header-text-container">
            <h2 className="header-title">Buat Resep Baru</h2>
            <p className="header-subtitle">Bagikan inspirasi masakanmu!</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Upload Area */}
          <label className="label">Foto Utama (Wajib)</label>
          <div className="image-upload-box">
            <input 
              type="file" 
              id="recipe-img" 
              className="hidden-file-input" 
              accept="image/*" 
              onChange={handleImageChange}
              disabled={uploadingImage} 
            />
            <label htmlFor="recipe-img" className="upload-label">
              {recipeImage ? (
                <div style={{ position: 'relative' }}>
                   <img 
                     src={URL.createObjectURL(recipeImage)} 
                     alt="Preview" 
                     style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', objectFit: 'cover' }} 
                   />
                   {uploadingImage && (
                     <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                       Mengupload...
                     </div>
                   )}
                </div>
              ) : (
                <>
                  <span className="camera-icon">📸</span>
                  <p>Klik untuk unggah foto</p>
                </>
              )}
            </label>
          </div>

          {/* Form Fields */}
          <label className="label">Judul</label>
          <input className="input" name="title" value={recipeInfo.title} onChange={handleRecipeInfoChange} required placeholder="Cth: Nasi Goreng Spesial" />

          <label className="label">Deskripsi</label>
          <input className="input" name="shortDescription" value={recipeInfo.shortDescription} onChange={handleRecipeInfoChange} placeholder="Ceritakan sedikit tentang resep ini" />

          {/* Details Row */}
          <div className="detail-row">
            <div className="detail-col">
              <label className="sub-label">Waktu (Menit)</label>
              <input className="input" type="number" name="totalTime" value={details.totalTime} onChange={handleDetailChange} required placeholder="0" />
            </div>
            <div className="detail-col">
              <label className="sub-label">Porsi (Orang)</label>
              <input className="input" type="number" name="servingSize" value={details.servingSize} onChange={handleDetailChange} required placeholder="0" />
            </div>
            <div className="detail-col">
              <label className="sub-label">Kesulitan</label>
              <select className="input select-input" name="difficulty" value={details.difficulty} onChange={handleDetailChange} required>
                <option value="" disabled>Pilih</option>
                <option value="Mudah">Mudah</option>
                <option value="Sedang">Sedang</option>
                <option value="Sulit">Sulit</option>
              </select>
            </div>
          </div>

          {/* Ingredients */}
          <label className="label">Bahan-Bahan</label>
          <div className="list">
            {ingredients.map((item, idx) => (
              <div className="row" key={idx}>
                <input className="input flex-grow" value={item} onChange={(e) => handleIngredientChange(idx, e.target.value)} placeholder={`Bahan ${idx + 1}`} required />
                {ingredients.length > 1 && <div className="trash-box" onClick={() => handleDeleteIngredient(idx)}>🗑️</div>}
              </div>
            ))}
            <button type="button" className="add-btn" onClick={handleAddIngredient}>+ Tambah Bahan</button>
          </div>

          {/* Steps */}
          <label className="label">Langkah-Langkah</label>
          <div className="list">
            {steps.map((step, idx) => (
              <div className="row" key={idx}>
                <input className="input flex-grow" value={step} onChange={(e) => handleStepChange(idx, e.target.value)} placeholder={`Langkah ${idx + 1}`} required />
                {steps.length > 1 && <div className="trash-box" onClick={() => handleDeleteStep(idx)}>🗑️</div>}
              </div>
            ))}
            <button type="button" className="add-btn" onClick={handleAddStep}>+ Tambah Langkah</button>
          </div>

          {/* Link Video (Bagian yang Hilang Sudah Dikembalikan) */}
          <label className="label" style={{marginTop: '20px'}}>Link Video (Opsional)</label>

          <div className="link-input-wrapper">
            <i className="fab fa-youtube link-icon youtube-icon"></i>
            <input
              className="input link-input"
              type="text"
              placeholder="Cth: https://youtube.com/watch?v=..."
              name="linkYoutube"
              value={recipeInfo.linkYoutube}
              onChange={handleRecipeInfoChange}
            />
          </div>

          <div className="link-input-wrapper">
            <i className="fab fa-tiktok link-icon tiktok-icon"></i>
            <input
              className="input link-input"
              type="text"
              placeholder="Cth: https://tiktok.com/@username/video/..."
              name="linkTiktok"
              value={recipeInfo.linkTiktok}
              onChange={handleRecipeInfoChange}
            />
          </div>

          <div className="link-input-wrapper">
            <i className="fab fa-instagram link-icon instagram-icon"></i>
            <input
              className="input link-input"
              type="text"
              placeholder="Cth: https://instagram.com/p/..."
              name="linkInstagram"
              value={recipeInfo.linkInstagram}
              onChange={handleRecipeInfoChange}
            />
          </div>

          {/* Actions */}
          <div className="button-row">
            <button type="button" className="cancel-btn" onClick={handleCancel}>Batal</button>
            <button type="submit" className="save-btn" disabled={isLoading || uploadingImage}>
              {isLoading ? "Menyimpan..." : "Terbitkan Resep"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;