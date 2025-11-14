// src/pages/CreateRecipe.jsx

import React, { useState } from 'react';
import '../css/CreateRecipe.css'; 
import '../css/app.css'; 

const DynamicInput = ({ label, placeholder, items, setItems }) => {
    const handleAdd = () => setItems([...items, '']);
    
    const handleChange = (index, value) => {
        const newItems = items.map((item, i) => i === index ? value : item);
        setItems(newItems);
    };
    
    const handleRemove = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="dynamic-group">
            <label>{label} *</label>
            {items.map((item, index) => (
                <div key={index} className="dynamic-input-row">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={item}
                        onChange={(e) => handleChange(index, e.target.value)}
                        required 
                    />
                    {items.length > 1 && ( 
                        <button type="button" onClick={() => handleRemove(index)} className="remove-btn">
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={handleAdd} className="cta-button small add-more-btn">
                <i className="fas fa-plus"></i> Tambah {label}
            </button>
        </div>
    );
};


const CreateRecipe = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [servings, setServings] = useState('');
    const [ingredients, setIngredients] = useState(['']); 
    const [steps, setSteps] = useState(['']); 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (ingredients.filter(i => i.trim() !== '').length === 0 || steps.filter(s => s.trim() !== '').length === 0) {
            alert('Bahan dan Langkah Memasak tidak boleh kosong!');
            return;
        }

        const recipeData = {
            title,
            description,
            prepTime: parseInt(prepTime) || 0,
            cookTime: parseInt(cookTime) || 0,
            servings: parseInt(servings) || 0,
            ingredients: ingredients.map(i => i.trim()).filter(i => i !== ''), 
            steps: steps.map(s => s.trim()).filter(s => s !== ''),
        };
        
        console.log('Data Resep Siap Dikirim:', recipeData);
        alert('Resep berhasil dibuat! (Simulasi)'); 
    };

    return (
        <div className="create-recipe-wrapper loggedin-body">
            <div className="create-recipe-container">
                <button className="back-button" onClick={() => window.history.back()}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="form-title"><i className="fas fa-utensils"></i> Unggah Resep Baru</h2>
                <p className="form-subtitle">Bagikan kreasi masakan Anda kepada komunitas CookConnect!</p>

                <form onSubmit={handleSubmit} className="recipe-form">
                    
                    <section className="form-section">
                        <h3>1. Info Dasar</h3>
                        <div className="form-group">
                            <label htmlFor="title">Judul Resep *</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Contoh: Ayam Geprek Sambal Matah"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Deskripsi Singkat</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                                placeholder="Ceritakan mengapa resep ini spesial..."
                            ></textarea>
                        </div>

                        <div className="form-row-info">
                            <div className="form-group">
                                <label htmlFor="servings">Porsi (Servings)</label>
                                <input
                                    type="number"
                                    id="servings"
                                    value={servings}
                                    onChange={(e) => setServings(e.target.value)}
                                    min="1"
                                    placeholder="4"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prepTime">Waktu Persiapan (menit)</label>
                                <input
                                    type="number"
                                    id="prepTime"
                                    value={prepTime}
                                    onChange={(e) => setPrepTime(e.target.value)}
                                    min="0"
                                    placeholder="15"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cookTime">Waktu Memasak (menit)</label>
                                <input
                                    type="number"
                                    id="cookTime"
                                    value={cookTime}
                                    onChange={(e) => setCookTime(e.target.value)}
                                    min="0"
                                    placeholder="30"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h3>2. Bahan-bahan</h3>
                        <DynamicInput
                            label="Bahan"
                            placeholder="Contoh: 250 gram tepung terigu protein sedang"
                            items={ingredients}
                            setItems={setIngredients}
                        />
                    </section>

                    <section className="form-section">
                        <h3>3. Langkah Memasak</h3>
                        <DynamicInput
                            label="Langkah"
                            placeholder="Contoh: Ulek kasar cabai dan bawang hingga halus"
                            items={steps}
                            setItems={setSteps}
                        />
                    </section>

                    <section className="form-section">
                        <h3>4. Unggah Gambar</h3>
                        <div className="form-group image-upload-group">
                            <label htmlFor="recipe-image" className="image-upload-label">
                                 <i className="fas fa-cloud-upload-alt"></i> Pilih Foto Utama Resep
                            </label>
                            <input
                                type="file"
                                id="recipe-image"
                                accept="image/*"
                                className="hidden-file-input"
                            />
                            <p className="upload-tip">Pilih foto hasil masakan terbaik Anda (maks 5MB).</p>
                        </div>
                    </section>

                    <button type="submit" className="cta-button auth-button large-button">
                        <i className="fas fa-paper-plane"></i> Publikasikan Resep
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRecipe;