import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const AddRecipeButton = () => {
  return (
    <>
      Add your own recipe
      <Link to="/recipes/new" className="button">
        <FontAwesomeIcon icon={faPlus} />
      </Link>
    </>
  );
};
