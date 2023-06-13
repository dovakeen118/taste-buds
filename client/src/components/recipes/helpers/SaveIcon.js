import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import { postRecipe } from "../../../services/requests/postRecipe";

export const SaveIcon = () => {
  const [shouldRedirect, setShouldRedirect] = useState({ id: null, status: false });
  const { id } = useParams();
  const handleClick = async () => {
    try {
      const { recipeResponse } = await postRecipe({ payload: { originalRecipeId: id } });
      setShouldRedirect({ id: recipeResponse.id, status: true });
    } catch (error) {
      console.error(`Error in fetch for Save: ${error.message}`);
    }
  };

  if (shouldRedirect.status) {
    location.href = `/recipes/${shouldRedirect.id}`;
  }

  return <FontAwesomeIcon icon={faStar} onClick={handleClick} className={"button-star yellow"} />;
};
