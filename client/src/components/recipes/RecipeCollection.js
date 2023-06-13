import React, { useState, useEffect } from "react";

import { getRecipes } from "../../services/requests/getRecipes";
import { getUserRecipes } from "../../services/requests/getUserRecipes";

import { RecipeTile } from "./RecipeTile";
import { SelectableOptions } from "./helpers/SelectableOptions";

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
      console.error(`Error in fetch for User: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [selectedFilterOptions]);

  const sortOptions = ["a - z", "z - a", "time tier"];
  const filterOptions = [
    "favorites",
    "breakfast",
    "lunch",
    "dinner",
    "snack",
    "dessert",
    "quick",
    "average",
    "extended",
  ];

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

  const recipeTiles = [...recipes].sort(sortRecipes(selectedSortOption)).map((recipe) => {
    return <RecipeTile key={recipe.id} recipe={recipe} />;
  });

  const handleSelectSortOption = (event) => {
    if (selectedSortOption === event.currentTarget.id) {
      setSelectedSortOption("");
    } else {
      setSelectedSortOption(event.currentTarget.id);
    }
  };

  const handleSelectFilterOption = (event) => {
    if (selectedFilterOptions.includes(event.currentTarget.id)) {
      setSelectedFilterOptions(
        selectedFilterOptions.filter((option) => option !== event.currentTarget.id)
      );
    } else {
      setSelectedFilterOptions([...selectedFilterOptions, event.currentTarget.id]);
    }
  };

  return (
    <>
      <div className="callout primary">
        <div className="grid-x callout button-group">
          <div className="cell medium-6">
            <p>sort by</p>
            <SelectableOptions
              options={sortOptions}
              selectedOption={selectedSortOption}
              handleSelect={handleSelectSortOption}
            />
          </div>
          <div className="cell medium-6">
            <p>filter by</p>
            <SelectableOptions
              options={filterOptions}
              selectedOption={selectedFilterOptions}
              handleSelect={handleSelectFilterOption}
            />
          </div>
        </div>
        {recipes.length > 0 ? (
          <div className="grid-x grid-margin-x">{recipeTiles}</div>
        ) : selectedSortOption || selectedFilterOptions.length > 0 ? (
          <p className="text-center">No recipes found</p>
        ) : (
          <p className="text-center">Add some recipes to the cookbook</p>
        )}
      </div>
    </>
  );
};
