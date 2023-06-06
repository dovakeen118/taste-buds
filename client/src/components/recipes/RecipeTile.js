import React from "react";
import { Link } from "react-router-dom";

const RecipeTile = (props) => {
  return (
    <Link to={`/recipes/${props.recipe.id}`} className="cell small-4 callout">
      <h3>{props.recipe.name}</h3>
      <ul>
        <h4>Tier: {props.recipe.tier}</h4>
        <h4>Meal: {props.recipe.meal}</h4>
      </ul>
    </Link>
  );
};

export default RecipeTile;
