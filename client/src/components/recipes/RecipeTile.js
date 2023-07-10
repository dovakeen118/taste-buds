import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHeart, faStar, faXmark } from "@fortawesome/free-solid-svg-icons";

import { TierIcon } from "./helpers/TierIcon";

export const RecipeTile = ({ recipe, userId }) => {
  return (
    <Link to={`/recipes/${recipe.id}`} className="cell callout recipe-tile">
      <div className="grid-x">
        <h3 className="cell small-11">{recipe.name}</h3>
        {recipe.favorite ? <FontAwesomeIcon icon={faHeart} className="cell small-1 pink" /> : null}
      </div>
      <div className="grid-x">
        <h5 className="cell medium-3">
          <TierIcon tier={recipe.tier} /> {recipe.tier} {recipe.meal}
        </h5>
        <h5 className="cell medium-3">
          {recipe.leftovers ? (
            <FontAwesomeIcon icon={faCheck} className="teal" />
          ) : (
            <FontAwesomeIcon icon={faXmark} className="red" />
          )}{" "}
          good for leftovers?
        </h5>
        {!recipe.originalRecipeId ? (
          <h5 className="cell medium-3">
            <FontAwesomeIcon icon={faStar} className="yellow" /> original
          </h5>
        ) : null}
        {userId ? null : (
          <h5 className="cell auto text-right">created by: {recipe.user?.username}</h5>
        )}
      </div>
    </Link>
  );
};
