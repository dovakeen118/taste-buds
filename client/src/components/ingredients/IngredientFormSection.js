import React from "react";

import { IngredientFormFields } from "./IngredientFormFields";

export const IngredientFormSection = ({
  addToArray,
  defaultIngredient,
  errors,
  handleIngredientChange,
  handleRemoveIngredient,
  ingredients,
}) => {
  const ingredientFields = ingredients.map((ingredient, index) => {
    return (
      <IngredientFormFields
        key={index}
        ingredient={ingredient}
        numIngredients={ingredients.length > 1}
        handleIngredientChange={(event) => handleIngredientChange(event, index)}
        handleRemoveIngredient={handleRemoveIngredient}
        index={index}
        errors={errors}
      />
    );
  });

  return (
    <div className="cell medium-6 callout recipe-column">
      <h3>Ingredients</h3>
      {ingredientFields}
      <button
        className="button"
        type="button"
        onClick={() => addToArray("ingredients", defaultIngredient)}
      >
        Add ingredient
      </button>
    </div>
  );
};
