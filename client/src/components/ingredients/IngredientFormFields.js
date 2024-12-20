import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const IngredientFormFields = ({
  ingredient,
  handleIngredientChange,
  handleRemoveIngredient,
  numIngredients,
  index,
  errors,
}) => {
  return (
    <div className="callout primary">
      <div className="grid-x grid-margin-x">
        <label htmlFor="name" className="cell small-6">
          Name {errors[`Ingredient ${index + 1} Name`] ? <span>*</span> : null}
          <input
            type="text"
            id="name"
            name="name"
            value={ingredient.name}
            onChange={handleIngredientChange}
            className="input-field"
          />
        </label>

        <div className="grid-x cell small-6">
          <label htmlFor="description" className="cell small-11">
            Details
          </label>
          {numIngredients ? (
            <FontAwesomeIcon
              icon={faXmark}
              className="cell small-1 x-icon"
              onClick={() => handleRemoveIngredient(index)}
            />
          ) : null}
          <input
            type="text"
            id="description"
            name="description"
            value={ingredient.description}
            onChange={handleIngredientChange}
            className="input-field"
          />
        </div>
      </div>

      <div className="grid-x grid-margin-x">
        <label htmlFor="amount" className="cell small-6">
          Amount {errors[`Ingredient ${index + 1} Amount`] ? <span>*</span> : null}
          <input
            type="number"
            id="amount"
            name="amount"
            value={ingredient.amount}
            onChange={handleIngredientChange}
            min={0}
            step={0.01}
            className="input-field"
          />
        </label>

        <label htmlFor="unit" className="cell small-6">
          Units {errors[`Ingredient ${index + 1} Unit`] ? <span>*</span> : null}
          <select
            id="unit"
            name="unit"
            value={ingredient.unit}
            onChange={handleIngredientChange}
            className="input-field"
          >
            <option value="select"> -- select an option -- </option>
            <option value="tsp">Teaspoon(s)</option>
            <option value="tbsp">Tablespoon(s)</option>
            <option value="oz">Ounce(s)</option>
            <option value="cup">Cup(s)</option>
            <option value="fl oz">Fluid Ounce(s)</option>
            <option value="pt">Pint(s)</option>
            <option value="qt">Quart(s)</option>
            <option value="gal">Gallon(s)</option>
            <option value="lb">Pounds(s)</option>
            <option value="box">Box(es)</option>
            <option value="can">Can(s)</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>
    </div>
  );
};
