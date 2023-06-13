import React from "react";

import { MealOptions } from "./MealOptions";
import { TierOptions } from "./TierOptions";

export const RecipeDetailFormFields = ({ recipe, handleChange, handleCheckChange, errors }) => {
  return (
    <>
      <div>
        <label htmlFor="name">
          Recipe name {errors["Name"] ? <span>*</span> : null}
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={recipe.name}
            className="input-field"
          />
        </label>
      </div>

      <div className="grid-x grid-margin-x">
        <div className="cell medium-6 callout">
          <p>Typical meal {errors["Meal"] ? <span>*</span> : null}</p>
          <MealOptions handleChange={handleChange} recipeMeal={recipe.meal} />
        </div>

        <div className="cell medium-6 callout">
          <p>Tier for time {errors["Tier"] ? <span>*</span> : null}</p>
          <TierOptions handleChange={handleChange} recipeTier={recipe.tier} />
        </div>
      </div>

      <div className="grid-x grid-margin-x">
        <label htmlFor="leftovers" className="cell small-6 medium-3">
          <input
            type="checkbox"
            id="leftovers"
            name="leftovers"
            onChange={handleCheckChange}
            checked={recipe.leftovers === true}
          />
          Good for leftovers? {errors["Leftovers"] ? <span>*</span> : null}
        </label>

        <label htmlFor="servings" className="cell small-6 medium-3">
          Number of servings {errors["Servings"] ? <span>*</span> : null}
          <input
            type="number"
            id="servings"
            name="servings"
            onChange={handleChange}
            value={recipe.servings}
            min={0}
            className="input-field"
          />
        </label>

        <label htmlFor="prepTime" className="cell small-6 medium-3">
          Prep time (minutes) {errors["PrepTime"] ? <span>*</span> : null}
          <input
            type="number"
            id="prepTime"
            name="prepTime"
            onChange={handleChange}
            value={recipe.prepTime}
            min={0}
            className="input-field"
          />
        </label>

        <label htmlFor="cookTime" className="cell small-6 medium-3">
          Cook time (minutes) {errors["CookTime"] ? <span>*</span> : null}
          <input
            type="number"
            id="cookTime"
            name="cookTime"
            onChange={handleChange}
            value={recipe.cookTime}
            min={0}
            className="input-field"
          />
        </label>
      </div>
    </>
  );
};
