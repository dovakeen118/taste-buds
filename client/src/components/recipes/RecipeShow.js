import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";

import { getRecipe } from "../../services/requests/getRecipe";

import { MeasurementIngredientList } from "../ingredients/MeasurementIngredientList";
import { RecipeDetails } from "./RecipeDetails";
import { StepList } from "../steps/StepsList";
import { FavoriteIcon } from "./helpers/FavoriteIcon";
import { SaveIcon } from "./helpers/SaveIcon";

export const RecipeShow = ({ user }) => {
  const [recipe, setRecipe] = useState({ measurements: [], steps: [] });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const { id } = useParams();
  const fetchRecipe = async () => {
    try {
      const { recipe } = await getRecipe({ id, setNotFound });
      setRecipe(recipe);
    } catch (error) {
      console.error(`Error in fetch for a Recipe: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchRecipe();
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
                  {recipe.user.username}{" "}
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
        <RecipeDetails recipe={recipe} />
        <div className="grid-x grid-margin-x">
          <MeasurementIngredientList measurements={recipe.measurements} />
          <StepList steps={recipe.steps} />
        </div>
      </div>
    </>
  );
};
