import React, { useState, useEffect } from "react";

import MeasurementIngredientList from "../ingredients/MeasurementIngredientList";
import StepList from "../steps/StepsList";

const RecipeList = (props) => {
  const [recipe, setRecipe] = useState({ measurements: [], steps: [] });

  const getRecipe = async () => {
    const { id } = props.match.params;
    try {
      const response = await fetch(`/api/v1/recipes/${id}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const responseBody = await response.json();
      setRecipe(responseBody.recipe);
    } catch (error) {
      console.error(`Error in fetch for a Recipe: ${error.message}`);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <>
      <h1>{recipe.name}</h1>
      <div className="grid-x callout">
        <ul className="cell medium-4">
          <li>Typical meal: {recipe.meal}</li>
          <li>Time tier: {recipe.tier}</li>
        </ul>
        <ul className="cell medium-4">
          <li>Number of servings: {recipe.servings ? recipe.servings : "n/a"}</li>
          <li>Good for leftovers? {recipe.leftovers ? "yes" : "no"}</li>
        </ul>
        <ul className="cell auto">
          <li>Prep Time: {recipe.prepTime ? `${recipe.prepTime} minutes` : "n/a"}</li>
          <li>Cook Time: {recipe.cookTime ? `${recipe.cookTime} minutes` : "n/a"}</li>
        </ul>
      </div>

      <div className="grid-x">
        <MeasurementIngredientList measurements={recipe.measurements} />
        <StepList steps={recipe.steps} />
      </div>
    </>
  );
};

export default RecipeList;
