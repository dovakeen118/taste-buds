import React, { useState, useEffect } from "react";

import RecipeTile from "./RecipeTile";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const response = await fetch("/api/v1/recipes");
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const responseBody = await response.json();
      setRecipes(responseBody.recipes);
    } catch (error) {
      console.error(`Error in fetch for Recipes: ${error.message}`);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const recipeTiles = recipes.map((recipe) => {
    return <RecipeTile key={recipe.id} recipe={recipe} />;
  });

  return (
    <>
      <h1>Taste Buds Recipes</h1>
      <div className="grid-x grid-margin-x">{recipeTiles}</div>
    </>
  );
};

export default RecipeList;
