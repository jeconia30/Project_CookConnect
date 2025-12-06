import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 
import Sidebar from '../components/Sidebar';
import RecipeCardFeed from '../components/RecipeCardFeed';
import { recipesData } from '../data/recipes';

const FeedPage = () => {
  return (
    <>
      <Navbar /> 
      <div className="feed-page-wrapper">
        <div className="feed-layout-container">
          
          <div className="sidebar-area">
            <Sidebar />
          </div>

          <div className="feed-area">
            {recipesData.map((recipe) => (
              <RecipeCardFeed key={recipe.id} recipe={recipe} />
            ))}
          </div>
          
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FeedPage;