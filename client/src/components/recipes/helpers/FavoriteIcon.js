import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

export const FavoriteIcon = ({ favorite, recipeUserId, setRecipe, user }) => {
  const { id } = useParams();
  const handleClick = async () => {
    if (user && user.id === recipeUserId) {
      try {
        const response = await fetch(`/api/v1/recipes/${id}`, {
          method: "PATCH",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ favorite: !favorite }),
        });
        if (!response.ok) {
          throw new Error(`${response.status} (${response.statusText})`);
        }
        const responseBody = await response.json();
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
