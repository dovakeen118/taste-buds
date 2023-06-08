import React, { useState, useEffect } from "react";

import RecipeTile from "../recipes/RecipeTile";

const UserProfile = (props) => {
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

  const recipes = user.recipes.map((recipe) => {
    return <RecipeTile key={recipe.id} recipe={recipe} />;
  });

  return (
    <>
      <h1>{user.email}</h1>
      <p>User since {user.createdAt}</p>
      <h3>Your recipes</h3>
      <ul className="grid-x grid-margin-x callout secondary">{recipes}</ul>
    </>
  );
};

export default UserProfile;