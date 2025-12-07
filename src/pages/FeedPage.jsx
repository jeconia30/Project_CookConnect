import React, { useState, useEffect } from 'react'; 
import RecipeCardFeed from '../components/RecipeCardFeed';
import { getRecipesData } from '../data/recipes'; 

const FeedPage = () => {
  const [feedRecipes, setFeedRecipes] = useState([]);
  
  useEffect(() => {
    setFeedRecipes(getRecipesData());
  }, []); 
  
  // Hanya kembalikan konten area feed
  return (
    <div className="feed-area">
      {feedRecipes.map((recipe) => ( 
        <RecipeCardFeed key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default FeedPage;