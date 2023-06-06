import React from "react";

const RecipeTile = (props) => {
  return (
    <div className="cell small-4 callout">
      <h3>{props.recipe.name}</h3>
      <ul>
        <h4>Tier: {props.recipe.tier}</h4>
        <h4>Meal: {props.recipe.meal}</h4>
      </ul>
    </div>
  );
};

export default RecipeTile;
