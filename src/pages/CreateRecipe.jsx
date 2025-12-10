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

  // UBAH: State ingredients sekarang menyimpan object { name, quantity }
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  
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

  const handleRecipeInfoChange = (e) => {
    const { name, value } = e.target;
    setRecipeInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // UBAH: Handler untuk input bahan yang terpisah (Nama & Kuantitas)
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  // UBAH: Menambah baris bahan baru dengan format object kosong
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleDeleteIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };

  const handleDeleteStep = (index) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setRecipeImage(file);
      setUploadingImage(true);
      try {
        const result = await uploadRecipeImage(file);
        setRecipeImageUrl(result.url);
        console.log("Gambar resep uploaded:", result.url);
      } catch (error) {
        alert("Gagal upload gambar: " + error.message);
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("Sesi habis. Silakan login ulang.");
      setIsLoading(false);
      return;
    }

    if (!recipeImageUrl) {
      alert("Harap tunggu upload gambar selesai atau pilih gambar terlebih dahulu.");
      setIsLoading(false);
      return;
    }

    // UBAH: Gabungkan Quantity dan Name menjadi satu string sebelum dikirim ke backend
    // Format: "200gr Daging Ayam"
    const finalIngredients = ingredients
      .filter(item => item.name.trim() !== "" || item.quantity.trim() !== "")
      .map(item => `${item.quantity.trim()} ${item.name.trim()}`.trim());

    const finalSteps = steps.filter((step) => step.trim() !== "");

    if (finalIngredients.length === 0) {
        alert("Mohon isi minimal satu bahan (Nama Bahan).");
        setIsLoading(false);
        return;
    }

    try {
      const payload = {
        title: recipeInfo.title,
        description: recipeInfo.shortDescription,
        image_url: recipeImageUrl,
        ingredients: finalIngredients, // Kirim array string
        steps: finalSteps,
        total_time: parseInt(details.totalTime) || 0,
        servings: parseInt(details.servingSize) || 0,
        difficulty: details.difficulty,
        video_url: recipeInfo.linkYoutube || null,
      };

      await api.post("/recipes", payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      alert("Resep berhasil diterbitkan!");
      navigate("/feed");
    } catch (error) {
      console.error("Error Create Recipe:", error);
      alert(
        "Gagal menerbitkan resep: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Batalkan pembuatan resep?")) navigate("/feed");
  };

  return (
    <div className="form-body">
      <form className="form-container" onSubmit={handleSubmit}>
        {" "}
        <div className="form-header">
          <span
            className="back-arrow"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          >
            ←
          </span>
          <div className="header-text-container">
            <h2 className="header-title">Buat Resep Baru Anda</h2>
            <p className="header-subtitle">
              Bagikan resep terbaik Anda kepada dunia dan inspirasi para
              CookConnectors lainnya!
            </p>
          </div>
        </div>
        <label className="label">Foto Utama Resep (Wajib)</label>
        <div className="image-upload-box">
          <input
            type="file"
            id="recipe-image-upload"
            className="hidden-file-input"
            onChange={handleImageChange}
            accept=".jpg, .jpeg, .png"
            disabled={uploadingImage}
          />
          <label htmlFor="recipe-image-upload" className="upload-label">
            
            {/* LOGIKA TAMPILAN GAMBAR */}
            {recipeImage ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src={URL.createObjectURL(recipeImage)}
                  alt="Preview Resep"
                  style={{
                    maxWidth: "100%", 
                    maxHeight: "200px", 
                    borderRadius: "8px",
                    objectFit: "cover",
                    marginBottom: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}
                />
                {uploadingImage && (
                  <p className="selected-image-name" style={{ color: '#e67e22' }}>⏳ Sedang mengupload...</p>
                )}
                {recipeImageUrl && !uploadingImage && (
                  <p className="selected-image-name" style={{ color: '#38761d' }}>✓ Foto siap diterbitkan! (Klik untuk ganti)</p>
                )}
              </div>
            ) : (
              <>
                <span className="camera-icon">📸</span>
                <p>Klik untuk mengunggah foto [cth: .jpg, .png]</p>
              </>
            )}

          </label>
        </div>
        <label className="label">Judul Resep</label>
        <input
          className="input"
          type="text"
          name="title"
          value={recipeInfo.title}
          onChange={handleRecipeInfoChange}
          placeholder="Cth: Ayam Geprek Sambal Matah"
          required
        />
        <label className="label">Deskripsi Singkat (Caption) - Opsional</label>
        <input
          className="input"
          type="text"
          name="shortDescription"
          value={recipeInfo.shortDescription}
          onChange={handleRecipeInfoChange}
          placeholder="Cth: Resep andalan keluarga yang pedasnya nagih!"
        />
        <label className="label sub-header">Detail Resep</label>
        <div className="detail-row">
          <div className="detail-col">
            <label className="sub-label">Total Waktu</label>
            <input
              className="input"
              type="number"
              name="totalTime"
              value={details.totalTime}
              onChange={handleDetailChange}
              placeholder="Cth: 30"
              required
            />
          </div>

          <div className="detail-col">
            <label className="sub-label">Porsi</label>
            <input
              className="input"
              type="number"
              name="servingSize"
              value={details.servingSize}
              onChange={handleDetailChange}
              placeholder="Cth: 2"
              required
            />
          </div>

          <div className="detail-col">
            <label className="sub-label">Kesulitan</label>
            <select
              className="input select-input"
              name="difficulty"
              value={details.difficulty}
              onChange={handleDetailChange}
              required
            >
              <option value="" disabled hidden>
                Pilih...
              </option>
              <option value="Mudah">Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Sulit">Sulit</option>
            </select>
          </div>
        </div>
        <label className="label">Bahan-Bahan (Minimal 1)</label>
        <div className="list">
          {ingredients.map((item, index) => (
            <div className="row" key={index}>
              {/* INPUT 1: KUANTITAS (Kecil di kiri) */}
              <input
                className="input"
                style={{ width: "25%", minWidth: "80px" }} 
                type="text"
                value={item.quantity}
                onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                placeholder="Takaran" 
              />
              
              {/* INPUT 2: NAMA BAHAN (Lebar di kanan) */}
              <input
                className="input flex-grow"
                type="text"
                value={item.name}
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                placeholder={index === 0 ? "Nama Bahan (cth: Daging Ayam)" : `Nama Bahan ${index + 1}`}
                required
              />
              
              {ingredients.length > 1 && (
                <div
                  className="trash-box"
                  onClick={() => handleDeleteIngredient(index)}
                >
                  🗑️
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={handleAddIngredient}
          >
            + Tambah Bahan
          </button>
        </div>
        <label className="label">Langkah-Langkah (Minimal 1)</label>
        <div className="list">
          {steps.map((step, index) => (
            <div className="row" key={index}>
              <input
                className="input flex-grow"
                type="text"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={
                  index === 0
                    ? "Cth: Panaskan minyak di wajan"
                    : `Langkah ${index + 1}`
                }
                required
              />
              {steps.length > 1 && (
                <div
                  className="trash-box"
                  onClick={() => handleDeleteStep(index)}
                >
                  🗑️
                </div>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={handleAddStep}>
            + Tambah Langkah
          </button>
        </div>
        <label className="label">Link Video (Opsional)</label>
        <div className="link-input-wrapper">
          <i className="fab fa-youtube link-icon youtube-icon"></i>
          <input
            className="input link-input"
            type="text"
            placeholder="Cth: https://youtube.com/watch?v=..."
            name="linkYoutube"
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
            onChange={handleRecipeInfoChange}
          />
        </div>
        <div className="button-row">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Batal
          </button>
          <button
            type="submit"
            className="save-btn"
            disabled={isLoading || uploadingImage}
          >
            {isLoading ? "Menerbitkan..." : "Terbitkan Resep"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipe;