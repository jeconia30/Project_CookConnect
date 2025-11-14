import React from 'react';
import RecipeCard from '../components/RecipeCard';

const mockRecipes = [
];

function LandingPage() {
    return (
        <div className="landing-page-container">
            <header className="main-header">
                <nav className="navbar">
                    <div className="logo">masak</div>
                </nav>
            </header>

            <section id="home" className="hero-section container">
            </section>

            <section id="preview" className="preview-section container">
                <div className="recipe-grid">
               
                    {mockRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </section>

        </div>
    );
}

export default LandingPage;