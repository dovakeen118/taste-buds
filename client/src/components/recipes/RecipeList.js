import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { RecipeCollection } from "./RecipeCollection";

export const RecipeList = ({ user }) => {
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

  return (
    <>
      <div className="grid-x">
        <h1 className="cell medium-6 medium-offset-3 text-center">Taste Buds Recipes</h1>
        <p className="cell medium-3 new-recipe-button">
          {user ? (
            <>
              Add your own recipe
              <Link to="/recipes/new" className="button">
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            </>
          ) : (
            <>Sign in to add a recipe</>
          )}
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
