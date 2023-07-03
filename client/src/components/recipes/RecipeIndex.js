import React from "react";

import { RecipeCollection } from "./RecipeCollection";

export const RecipeIndex = ({ user }) => {
  return (
    <>
      <h1 className="text-center">Taste Buds Recipes</h1>
      <RecipeCollection />
    </>
  );
};
