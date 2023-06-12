import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { RecipeCollection } from "../recipes/RecipeCollection";

export const UserProfile = (props) => {
  const [user, setUser] = useState({ recipes: [] });

  const getUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${props.user.id}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const responseBody = await response.json();
      setUser(responseBody.user);
    } catch (error) {
      console.error(`Error in fetch for User: ${error.message}`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h1>{user.email}</h1>
      <p>User since {new Date(user.createdAt).toLocaleString()}</p>
      <div className="grid-x">
        <h3 className="cell medium-4 medium-offset-4 text-center">Your recipe book</h3>
        <p className="cell medium-4 new-recipe-button">
          Add your own recipe
          <Link to="/recipes/new" className="button">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </p>
      </div>
      <RecipeCollection recipeData={user.recipes} />
    </>
  );
};
