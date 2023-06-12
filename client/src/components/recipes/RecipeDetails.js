import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";

import { MeasurementIngredientList } from "../ingredients/MeasurementIngredientList";
import { StepList } from "../steps/StepsList";
import { FavoriteIcon } from "./helpers/FavoriteIcon";
import { SaveIcon } from "./helpers/SaveIcon";

export const RecipeDetails = ({ user }) => {
  const [recipe, setRecipe] = useState({ measurements: [], steps: [] });
  const [shouldRedirect, setShouldRedirect] = useState(false);
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

  if (shouldRedirect) {
    location.href = `/recipes/${recipe.originalRecipeId}`;
  }

  if (notFound) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="text-center">
        {recipe.name ? (
          <>
            <h1>
              {recipe.name}{" "}
              {user && user.id === recipe.userId ? (
                <FavoriteIcon
                  favorite={recipe.favorite}
                  recipeUserId={recipe.userId}
                  setRecipe={setRecipe}
                  user={user}
                />
              ) : null}
              {user && user.id !== recipe.userId ? <SaveIcon setRecipe={setRecipe} /> : null}
            </h1>
            <h3 className="subheader">
              Written by{" "}
              {user?.id === recipe.userId ? (
                "you"
              ) : (
                <>
                  {recipe.user.email}{" "}
                  {recipe.favorite ? <FontAwesomeIcon icon={faHeart} className="pink" /> : null}
                </>
              )}
            </h3>
            {recipe.originalRecipeId ? (
              <h5 className="clickable-text subheader" onClick={() => setShouldRedirect(true)}>
                <FontAwesomeIcon icon={faStar} className="yellow" /> Original recipe
              </h5>
            ) : null}
          </>
        ) : (
          <h3 className="subheader">Loading...</h3>
        )}
      </div>
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
