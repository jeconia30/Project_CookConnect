import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../api/axiosInstance";
import "../styles/app.css";

function CreateRecipe() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [recipeImage, setRecipeImage] = useState(null);

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

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setRecipeImage(file);
    }
  };

  // --- LOGIKA UTAMA: TERBITKAN RESEP ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const finalIngredients = ingredients.filter((item) => item.trim() !== "");
    const finalSteps = steps.filter((step) => step.trim() !== "");
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      alert("Anda harus login untuk menerbitkan resep.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Buat Payload
      const payload = {
        title: recipeInfo.title,
        description: recipeInfo.shortDescription,
        image: recipeImage ? "PLACEHOLDER_IMAGE_URL" : null,
        ingredients: finalIngredients,
        steps: finalSteps,
        details: details,
        videos: {
          youtube: recipeInfo.linkYoutube,
          tiktok: recipeInfo.linkTiktok,
          instagram: recipeInfo.linkInstagram,
        },
      };

      // 2. PANGGIL API POST
      await api.post("/recipes", payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      alert("Resep berhasil diterbitkan!");
      navigate("/feed");
    } catch (error) {
      console.error("Error Create Recipe:", error.response || error);
      alert(
        "Gagal menerbitkan resep. Pastikan semua field wajib terisi dan Anda sudah login."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (
      window.confirm("Yakin ingin membatalkan resep? Semua input akan hilang.")
    ) {
      navigate("/feed");
    }
  };

  return (
    <div className="form-body">
      {/* 1. Navbar di Atas */}

      <div className="form-container">
        {/* Header dengan tombol kembali */}
        <div className="form-header">
          {/* Tambahkan onClick ke panah kembali */}
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

        {/* Input Foto */}
        <label className="label">Foto Utama Resep (Wajib)</label>
        <div className="image-upload-box">
          <input
            type="file"
            id="recipe-image-upload"
            className="hidden-file-input"
            onChange={handleImageChange}
            accept=".jpg, .jpeg, .png"
          />
          <label htmlFor="recipe-image-upload" className="upload-label">
            <span className="camera-icon">📸</span>
            {recipeImage ? (
              <img
                src={recipeImage}
                alt="Preview Resep"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            ) : (
              <p>Klik untuk mengunggah foto [cth: .jpg, .png]</p>
            )}
            {recipeImage && (
              <p className="selected-image-name">Foto berhasil diunggah!</p>
            )}
          </label>
        </div>

        {/* Input Judul & Deskripsi */}
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

        {/* Detail Resep */}
        <label className="label sub-header">Detail Resep</label>
        <div className="detail-row">
          {/* Total Waktu, Porsi, Kesulitan (Wajib) */}
          {/* ... (bagian ini tidak diubah, tetap sama) ... */}
          <div className="detail-col">
            <label className="sub-label">Total Waktu</label>
            <input
              className="input"
              type="text"
              name="totalTime"
              value={details.totalTime}
              onChange={handleDetailChange}
              placeholder="Cth: 30 Menit"
              required
            />
          </div>

          <div className="detail-col">
            <label className="sub-label">Porsi</label>
            <input
              className="input"
              type="text"
              name="servingSize"
              value={details.servingSize}
              onChange={handleDetailChange}
              placeholder="Cth: 2 orang"
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
                Pilih tingkat kesulitan
              </option>
              <option value="Mudah">Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Sulit">Sulit</option>
            </select>
          </div>
        </div>

        {/* Bahan-Bahan */}
        <label className="label">Bahan-Bahan (Minimal 1)</label>
        <div className="list">
          {ingredients.map((item, index) => (
            <div className="row" key={index}>
              <input
                className="input flex-grow"
                type="text"
                value={item}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={
                  index === 0 ? "Cth: 200gr Daging Ayam" : `Bahan ${index + 1}`
                }
                required // Bahan pertama wajib
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

        {/* Langkah Memasak */}
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
                required // Langkah pertama wajib
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

        {/* Link Video */}
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

        {/* Tombol Aksi - Dibungkus oleh FORM (kita perlu form tag di sini) */}
        {/* Karena komponen ini tidak dibungkus <form> secara keseluruhan, kita ganti div dengan form dan onSubmit */}
        <form onSubmit={handleSubmit}>
          {/* Ini adalah tombol Batal yang kita ganti type-nya jadi button agar tidak trigger submit */}
          <div className="button-row">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Batal
            </button>
            <button type="submit" className="save-btn" disabled={isLoading}>
              {isLoading ? "Menerbitkan..." : "Terbitkan Resep"}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Footer di Bawah */}
    </div>
  );
}

export default CreateRecipe;
