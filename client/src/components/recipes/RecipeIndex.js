import React, { useState, useEffect } from "react";

import { getRecipes } from "../../services/requests/getRecipes";

import { AddRecipeButton } from "./helpers/AddRecipeButton";
import { RecipeCollection } from "./RecipeCollection";

export const RecipeIndex = ({ user }) => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const { recipes } = await getRecipes();
      setRecipes(recipes);
    } catch (error) {
      console.error(`Error in fetch for Recipes: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <div className="grid-x">
        <h1 className="cell medium-6 medium-offset-3 text-center">Taste Buds Recipes</h1>
        <p className="cell medium-3 new-recipe-button">
          {user ? <AddRecipeButton /> : <>Sign in to add a recipe</>}
        </p>
      </div>
      {recipes.length > 0 ? (
        <RecipeCollection recipeData={recipes} />
      ) : (
        <div className="callout primary">
          <h3 className="text-center">Loading...</h3>
        </div>
      )}
    </>
  );
};
