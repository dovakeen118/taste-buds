import React, { useState } from "react";

import { RecipeTile } from "./RecipeTile";
import { SortOptions } from "./helpers/SortOptions";

export const RecipeCollection = ({ recipeData }) => {
  const [selectedSortOption, setSelectedSortOption] = useState("");

  const sortOptions = ["a - z", "z - a", "time tier"];

  const sortRecipes = (sortOption) => {
    const tierOrder = ["quick", "average", "extended"];
    if (sortOption === "a - z") {
      return (a, b) => a.name.localeCompare(b.name);
    } else if (sortOption === "z - a") {
      return (a, b) => b.name.localeCompare(a.name);
    } else if (sortOption === "time tier") {
      return (a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
    } else {
      return (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt);
    }
  };

  const recipes = [...recipeData].sort(sortRecipes(selectedSortOption)).map((recipe) => {
    return <RecipeTile key={recipe.id} recipe={recipe} />;
  });

  return (
    <>
      <div className="callout primary">
        <div className="callout button-group">
          <SortOptions
            sortOptions={sortOptions}
            selectedSortOption={selectedSortOption}
            setSelectedSortOption={setSelectedSortOption}
          />
        </div>
        <div className="grid-x grid-margin-x">{recipes}</div>
      </div>
    </>
  );
};
