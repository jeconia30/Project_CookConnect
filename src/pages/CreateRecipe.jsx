import React, { useState } from "react";
import "../styles/app.css";
// Pastikan path import ini benar sesuai folder kamu
import NavbarLoggedin from "../components/Navbar"; 
import Footer from "../components/Footer"; 

function CreateRecipe() {
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [recipeImage, setRecipeImage] = useState(null);
  
  const [recipeInfo, setRecipeInfo] = useState({
      title: "",
      shortDescription: "", 
  });

  const [details, setDetails] = useState({
    totalTime: "",
    servingSize: "",
    difficulty: "", 
  });

  const handleRecipeInfoChange = (e) => {
    const { name, value } = e.target;
    setRecipeInfo(prevInfo => ({
        ...prevInfo,
        [name]: value
    }));
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
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

  return (
    <div className="form-body">
      {/* 1. Navbar di Atas */}
      <NavbarLoggedin />

      <div className="form-container">
        
        {/* Header dengan tombol kembali */}
        <div className="form-header">
          <span className="back-arrow">←</span> 
          <div className="header-text-container">
            <h2 className="header-title">Buat Resep Baru Anda</h2>
            <p className="header-subtitle">Bagikan resep terbaik Anda kepada dunia dan inspirasi para CookConnectors lainnya!</p>
          </div>
        </div>

        {/* Input Foto */}
        <label className="label">Foto Utama Resep</label>
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
            <p>Klik untuk mengunggah foto [cth: .jpg, .png]</p>
            {recipeImage && <p className="selected-image-name">{recipeImage.name}</p>}
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
            <label className="sub-label">Total Waktu</label>
            <input 
              className="input" 
              type="text" 
              name="totalTime"
              value={details.totalTime}
              onChange={handleDetailChange}
              placeholder="Cth: 30 Menit" 
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
              <option value="" disabled hidden>Pilih tingkat kesulitan</option>
              <option value="Mudah">Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Sulit">Sulit</option>
            </select>
          </div>
        </div>
        
        {/* Bahan-Bahan */}
        <label className="label">Bahan-Bahan</label> 
        <div className="list">
          {ingredients.map((item, index) => (
            <div className="row" key={index}>
              <input
                className="input flex-grow"
                type="text"
                value={item}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={index === 0 ? "Cth: 200gr Daging Ayam" : `Bahan ${index + 1}`} 
              />
              {ingredients.length > 1 && (
                <div className="trash-box" onClick={() => handleDeleteIngredient(index)}>
                  🗑️
                </div>
              )}
            </div>
          ))}
          <button className="add-btn" onClick={handleAddIngredient}>+ Tambah Bahan</button> 
        </div>

        {/* Langkah Memasak */}
        <label className="label">Langkah-Langkah</label> 
        <div className="list">
          {steps.map((step, index) => (
            <div className="row" key={index}>
              <input
                className="input flex-grow"
                type="text"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={index === 0 ? "Cth: Panaskan minyak di wajan" : `Langkah ${index + 1}`} 
              />
              {steps.length > 1 && (
                <div className="trash-box" onClick={() => handleDeleteStep(index)}>
                  🗑️
                </div>
              )}
            </div>
          ))}
          <button className="add-btn" onClick={handleAddStep}>+ Tambah Langkah</button>
        </div>

        {/* Link Video */}
        <label className="label">Link Video (Opsional)</label>
        
        <div className="link-input-wrapper"> 
          <i className="fab fa-youtube link-icon youtube-icon"></i> 
          <input className="input link-input" type="text" placeholder="Cth: https://youtube.com/watch?v=..." />
        </div>

        <div className="link-input-wrapper">
          <i className="fab fa-tiktok link-icon tiktok-icon"></i> 
          <input className="input link-input" type="text" placeholder="Cth: https://tiktok.com/@username/video/..." />
        </div>

        <div className="link-input-wrapper">
          <i className="fab fa-instagram link-icon instagram-icon"></i> 
          <input className="input link-input" type="text" placeholder="Cth: https://instagram.com/p/..." />
        </div>

        {/* Tombol Aksi */}
        <div className="button-row">
          <button className="cancel-btn">Batal</button>
          <button className="save-btn">Terbitkan Resep</button> 
        </div>

      </div>

      {/* 2. Footer di Bawah */}
      <Footer />
      
    </div>
  );
}

export default CreateRecipe;