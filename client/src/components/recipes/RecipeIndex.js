import React from "react";

import { AddRecipeButton } from "./helpers/AddRecipeButton";
import { RecipeCollection } from "./RecipeCollection";

export const RecipeIndex = ({ user }) => {
  return (
    <>
      <div className="grid-x">
        <h1 className="cell medium-6 medium-offset-3 text-center">Taste Buds Recipes</h1>
        <p className="cell medium-3 new-recipe-button">
          {user ? <AddRecipeButton /> : <>Sign in to add a recipe</>}
        </p>
      </div>
      <RecipeCollection />
    </>
  );
};
