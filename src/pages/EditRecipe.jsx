import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import { uploadRecipeImage } from "../services/uploadService"; 
import "../styles/app.css";
import { showPopup, showConfirm } from "../utils/swal";

function EditRecipe() {
  const { id } = useParams(); // Ambil ID resep
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // States (Sama seperti CreateRecipe)
  const [uploadingImage, setUploadingImage] = useState(false);
  const [recipeImage, setRecipeImage] = useState(null); 
  const [recipeImageUrl, setRecipeImageUrl] = useState(null); 
  
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [steps, setSteps] = useState([""]);
  const [recipeInfo, setRecipeInfo] = useState({
    title: "", shortDescription: "", linkYoutube: "", linkTiktok: "", linkInstagram: ""
  });
  const [details, setDetails] = useState({
    totalTime: "", servingSize: "", difficulty: ""
  });

  // 1. FETCH DATA RESEP SAAT LOAD
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const res = await api.get(`/recipes/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        const data = res.data.data || res.data;

        // Populate State
        setRecipeInfo({
            title: data.title,
            shortDescription: data.description,
            linkYoutube: data.video_url || "",
            linkTiktok: data.tiktok_url || "",
            linkInstagram: data.instagram_url || ""
        });
        setDetails({
            totalTime: data.total_time,
            servingSize: data.servings,
            difficulty: data.difficulty
        });
        setRecipeImageUrl(data.image_url); // Gambar lama

        // Parse Ingredients (Asumsi format string: "1 sdt Garam")
        // Kita coba pisahkan sederhana, atau user edit manual
        if(data.ingredients) {
            const mappedIng = data.ingredients.map(ing => {
                // Logika pemisahan sederhana berdasarkan spasi pertama (bisa disesuaikan)
                const parts = ing.split(" "); 
                const qty = parts[0] || ""; 
                const name = parts.slice(1).join(" ") || ing;
                return { quantity: qty, name: name };
            });
            setIngredients(mappedIng.length ? mappedIng : [{ name: "", quantity: "" }]);
        }

        if(data.steps) {
            setSteps(data.steps.length ? data.steps : [""]);
        }

      } catch (err) {
        showPopup("Error", "Gagal memuat data resep.", "error");
        navigate("/feed");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, [id, navigate]);

// --- HANDLERS UNTUK INPUT FORM ---

  const handleRecipeInfoChange = (e) => setRecipeInfo({ ...recipeInfo, [e.target.name]: e.target.value });
  const handleDetailChange = (e) => setDetails({ ...details, [e.target.name]: e.target.value });
  
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
  const handleAddIngredient = () => setIngredients([...ingredients, { name: "", quantity: "" }]);
  const handleAddStep = () => setSteps([...steps, ""]);
  const handleDeleteIngredient = (index) => {
     if (ingredients.length > 1) setIngredients(ingredients.filter((_, i) => i !== index));
  };
  const handleDeleteStep = (index) => {
     if (steps.length > 1) setSteps(steps.filter((_, i) => i !== index));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setRecipeImage(file);
      setUploadingImage(true);
      try {
        const result = await uploadRecipeImage(file);
        setRecipeImageUrl(result.url);
      } catch (error) {
        showPopup("Gagal", "Upload gambar gagal", "error");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  // 2. HANDLE SUBMIT (PUT REQUEST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const authToken = localStorage.getItem("authToken");

    const finalIngredients = ingredients.map(item => `${item.quantity} ${item.name}`.trim());
    const finalSteps = steps.filter(step => step.trim() !== "");

    try {
      const payload = {
        title: recipeInfo.title,
        description: recipeInfo.shortDescription,
        image_url: recipeImageUrl,
        ingredients: finalIngredients,
        steps: finalSteps,
        total_time: parseInt(details.totalTime) || 0,
        servings: parseInt(details.servingSize) || 0,
        difficulty: details.difficulty,
        video_url: recipeInfo.linkYoutube,
        tiktok_url: recipeInfo.linkTiktok,
        instagram_url: recipeInfo.linkInstagram
      };

      // PANGGIL PUT endpoint
      await api.put(`/recipes/${id}`, payload, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      await showPopup("Berhasil!", "Resep berhasil diperbarui!", "success");
      navigate(`/recipe/${id}`);
    } catch (error) {
      showPopup("Gagal", "Gagal memperbarui resep.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if(isLoading) return <div className="feed-area" style={{textAlign:'center', marginTop:'50px'}}>Memuat Data...</div>;

return (
    <div className="form-body">
      <form className="form-container" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="form-header">
          <span
            className="back-arrow"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          >
            ←
          </span>
          <div className="header-text-container">
            <h2 className="header-title">Edit Resep</h2>
            <p className="header-subtitle">
              Perbarui informasi resep Anda agar semakin menarik!
            </p>
          </div>
        </div>

        {/* Upload Foto */}
        <label className="label">Foto Utama Resep (Wajib)</label>
        <div className="image-upload-box">
          <input
            type="file"
            id="edit-recipe-image"
            className="hidden-file-input"
            onChange={handleImageChange}
            accept=".jpg, .jpeg, .png"
            disabled={uploadingImage}
          />
          <label htmlFor="edit-recipe-image" className="upload-label">
            {(recipeImage || recipeImageUrl) ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src={recipeImage ? URL.createObjectURL(recipeImage) : recipeImageUrl}
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
                {!uploadingImage && (
                  <p className="selected-image-name" style={{ color: '#38761d' }}>✓ Klik untuk ganti foto</p>
                )}
              </div>
            ) : (
              <>
                <span className="camera-icon">📸</span>
                <p>Klik untuk mengunggah foto baru [cth: .jpg, .png]</p>
              </>
            )}
          </label>
        </div>

        {/* Judul & Deskripsi */}
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

        <label className="label">Deskripsi Singkat (Caption)</label>
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
          <div className="detail-col">
            <label className="sub-label">Total Waktu (Menit)</label>
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
            <label className="sub-label">Porsi (Orang)</label>
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
              <option value="" disabled hidden>Pilih...</option>
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
                className="input"
                style={{ width: "25%", minWidth: "80px" }} 
                type="text"
                value={item.quantity}
                onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                placeholder="Takaran" 
              />
              
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

        {/* Langkah-Langkah */}
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

        {/* Social Links */}
        <label className="label">Link Video (Opsional)</label>
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

        {/* Tombol Aksi */}
        <div className="button-row">
          <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
            Batal
          </button>
          <button
            type="submit"
            className="save-btn"
            disabled={isSaving || uploadingImage}
          >
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;