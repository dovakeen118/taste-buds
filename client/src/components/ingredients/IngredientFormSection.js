import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
    <div className="cell medium-6 recipe-column">
      <h3 className="text-center">Ingredients</h3>
      <div className="callout">
        {ingredientFields}
        <button
          className="button expanded"
          type="button"
          onClick={() => addToArray("ingredients", defaultIngredient)}
        >
          <FontAwesomeIcon icon={faPlus} /> ingredient
        </button>
      </div>
    </div>
  );
};
