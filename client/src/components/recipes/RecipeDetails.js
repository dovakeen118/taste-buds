import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { TierIcon } from "./helpers/TierIcon";
import { toHoursAndMinutes } from "../../services/toHoursAndMinutes";

export const RecipeDetails = ({ recipe }) => {
  const totalTime =
    recipe.prepTime && recipe.cookTime
      ? recipe.prepTime + recipe.cookTime
      : recipe.prepTime || recipe.cookTime;

  return (
    <div className="grid-x callout">
      <div className="cell medium-4">
        <p>
          <TierIcon tier={recipe.tier} /> {recipe.tier} {recipe.meal}
        </p>
        <p>
          {recipe.leftovers ? (
            <FontAwesomeIcon icon={faCheck} className="teal" />
          ) : (
            <FontAwesomeIcon icon={faXmark} className="red" />
          )}{" "}
          good for leftovers?
        </p>
      </div>
      <div className="cell medium-4">
        {totalTime ? <p>Total time: {toHoursAndMinutes(totalTime)}</p> : null}
        <p>
          {recipe.servings ? recipe.servings : "n/a"} serving
          {recipe.servings > 1 || !recipe.servings ? "s" : null}
        </p>
      </div>
      <div className="cell medium-4">
        <p>Prep Time: {recipe.prepTime ? toHoursAndMinutes(recipe.prepTime) : "n/a"}</p>
        <p>Cook Time: {recipe.cookTime ? toHoursAndMinutes(recipe.cookTime) : "n/a"}</p>
      </div>
    </div>
  );
};
