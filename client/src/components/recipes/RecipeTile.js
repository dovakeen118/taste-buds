import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const RecipeTile = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe.id}`} className="cell medium-4 callout recipe-tile">
      <div className="grid-x">
        <h3 className="cell small-11">{recipe.name}</h3>
        {recipe.favorite ? <FontAwesomeIcon icon={faHeart} className="cell small-1 pink" /> : null}
      </div>
      <div>
        <h5>Tier: {recipe.tier}</h5>
        <h5>Meal: {recipe.meal}</h5>
      </div>
    </Link>
  );
};
