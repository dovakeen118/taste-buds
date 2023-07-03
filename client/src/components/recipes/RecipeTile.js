import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { TierIcon } from "./helpers/TierIcon";

export const RecipeTile = ({ recipe, userId }) => {
  return (
    <Link to={`/recipes/${recipe.id}`} className="cell callout recipe-tile">
      <div className="grid-x">
        <h3 className="cell small-11">{recipe.name}</h3>
        {recipe.favorite ? <FontAwesomeIcon icon={faHeart} className="cell small-1 pink" /> : null}
      </div>
      <div className="grid-x">
        <h5 className="cell auto">
          <TierIcon tier={recipe.tier} /> {recipe.tier} {recipe.meal}
        </h5>
        {userId ? null : (
          <h5 className="cell auto text-right">written by: {recipe.user?.username}</h5>
        )}
      </div>
    </Link>
  );
};
