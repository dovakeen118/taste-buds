import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

import { MeasurementIngredientList } from "../ingredients/MeasurementIngredientList";
import { StepList } from "../steps/StepsList";
import { FavoriteIcon } from "./FavoriteIcon";

export const RecipeDetails = ({ user }) => {
  const [recipe, setRecipe] = useState({ measurements: [], steps: [] });
  const [notFound, setNotFound] = useState(false);

  const { id } = useParams();
  const getRecipe = async () => {
    try {
      const response = await fetch(`/api/v1/recipes/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          setNotFound(true);
        }
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

  if (notFound) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1 className="text-center">
        {recipe.name}{" "}
        <FavoriteIcon
          favorite={recipe.favorite}
          recipeUserId={recipe.userId}
          setRecipe={setRecipe}
          user={user}
        />
      </h1>
      <div className="callout primary">
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

        <div className="grid-x grid-margin-x">
          <MeasurementIngredientList measurements={recipe.measurements} />
          <StepList steps={recipe.steps} />
        </div>
      </div>
    </>
  );
};
