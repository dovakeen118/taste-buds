import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { RecipeTile } from "./RecipeTile";

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

  const recipeTiles = recipes.map((recipe) => {
    return <RecipeTile key={recipe.id} recipe={recipe} />;
  });

  return (
    <>
      <div className="grid-x">
        <h1 className="cell small-6">Taste Buds Recipes</h1>
        <p className="cell small-6 new-recipe-button">
          {user ? (
            <>
              Add your own recipe?
              <Link to="/recipes/new" className="button">
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            </>
          ) : (
            <>Sign in to add a recipe</>
          )}
        </p>
      </div>
      <div className="grid-x grid-margin-x callout primary">{recipeTiles}</div>
    </>
  );
};
