import React, { useState, useEffect } from "react";

import { getRecipes } from "../../services/requests/getRecipes";
import { getUserRecipes } from "../../services/requests/getUserRecipes";

import { RecipeTile } from "./RecipeTile";
import { SortFilterContainer } from "./helpers/SortFilterContainer";

export const RecipeCollection = ({ userId }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedFilterOptions, setSelectedFilterOptions] = useState([]);

  const fetchRecipes = async () => {
    try {
      if (userId) {
        const { userRecipes } = await getUserRecipes({ userId, options: selectedFilterOptions });
        setRecipes([...userRecipes]);
      } else {
        const { recipes: recipesList } = await getRecipes({ options: selectedFilterOptions });
        setRecipes([...recipesList]);
      }
    } catch (error) {
      console.error(`Error in fetch for Recipes: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [selectedFilterOptions]);

  const sortRecipes = (sortOption) => {
    const tierOrder = ["quick", "average", "extended"];
    if (sortOption === "a - z") {
      return (a, b) => a.name.localeCompare(b.name);
    } else if (sortOption === "z - a") {
      return (a, b) => b.name.localeCompare(a.name);
    } else if (sortOption === "low time") {
      return (a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
    } else if (sortOption === "high time") {
      return (a, b) => tierOrder.indexOf(b.tier) - tierOrder.indexOf(a.tier);
    } else {
      return (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt);
    }
  };

  const recipeTiles = [...recipes].sort(sortRecipes(selectedSortOption)).map((recipe) => {
    return <RecipeTile key={recipe.id} recipe={recipe} userId={userId} />;
  });

  return (
    <>
      <SortFilterContainer
        selectedSortOption={selectedSortOption}
        setSelectedSortOption={setSelectedSortOption}
        selectedFilterOptions={selectedFilterOptions}
        setSelectedFilterOptions={setSelectedFilterOptions}
      />
      <div className="callout primary small-12 recipes-section">
        {selectedSortOption ? (
          <p>
            Sorting by: <strong>{selectedSortOption}</strong>
          </p>
        ) : null}
        {selectedFilterOptions.length > 0 ? (
          <p>
            Filtering by: <strong>{selectedFilterOptions.join(", ")}</strong>
          </p>
        ) : null}

        {recipes.length > 0 ? (
          <div className="grid-x grid-margin-x">{recipeTiles}</div>
        ) : selectedSortOption || selectedFilterOptions.length > 0 ? (
          <h4 className="text-center">No recipes found</h4>
        ) : (
          <h4 className="text-center">Add some recipes to the cookbook</h4>
        )}
      </div>
    </>
  );
};
