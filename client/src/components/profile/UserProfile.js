import React from "react";

import { formatDate } from "../../services/formatDate";

import { RecipeCollection } from "../recipes/RecipeCollection";
import { AddRecipeButton } from "../recipes/helpers/AddRecipeButton";

export const UserProfile = ({ user }) => {
  return (
    <>
      <h1>{user.username}</h1>
      <h3 className="subheader">
        {user.createdAt ? `member since ${formatDate(user.createdAt)}` : null}
      </h3>
      <div className="grid-x">
        <h3 className="cell medium-4 medium-offset-4 text-center">Your recipe book</h3>
        <p className="cell medium-4 new-recipe-button">
          <AddRecipeButton />
        </p>
      </div>
      <RecipeCollection userId={user.id} />
    </>
  );
};
