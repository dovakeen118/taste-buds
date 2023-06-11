import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export const SaveIcon = () => {
  const [shouldRedirect, setShouldRedirect] = useState({ id: null, status: false });
  const { id } = useParams();
  const handleClick = async () => {
    try {
      const response = await fetch("/api/v1/recipes", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ originalRecipeId: id }),
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const responseBody = await response.json();
      console.log(responseBody.recipe.id);
      setShouldRedirect({ id: responseBody.recipe.id, status: true });
    } catch (error) {
      console.error(`Error in fetch for Save: ${error.message}`);
    }
  };

  if (shouldRedirect.status) {
    location.href = `/recipes/${shouldRedirect.id}`;
  }

  return <FontAwesomeIcon icon={faStar} onClick={handleClick} className={"button-star star"} />;
};
