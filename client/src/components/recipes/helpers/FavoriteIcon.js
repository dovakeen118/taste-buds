import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

import { patchRecipe } from "../../../services/requests/patchRecipe";

export const FavoriteIcon = ({ favorite, recipeUserId, setRecipe, user }) => {
  const { id } = useParams();
  const handleClick = async () => {
    if (user && user.id === recipeUserId) {
      try {
        const { recipe } = await patchRecipe({ id, payload: { favorite: !favorite } });
        setRecipe(responseBody.recipe);
      } catch (error) {
        console.error(`Error in fetch for Favorite: ${error.message}`);
      }
    }
  };

  return (
    <FontAwesomeIcon
      icon={favorite ? faSolidHeart : faRegularHeart}
      onClick={handleClick}
      className={user && user.id === recipeUserId ? "button-heart pink" : "pink"}
    />
  );
};
