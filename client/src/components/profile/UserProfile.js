import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faSeedling } from "@fortawesome/free-solid-svg-icons";

import { formatDate } from "../../services/formatDate";
import { getUserStats } from "../../services/requests/getUserStats";

import { MealDonutChart } from "../helpers/MealDonutChart";
import { TimeDonutChart } from "../helpers/TimeDonutChart";
import { RecipeCollection } from "../recipes/RecipeCollection";
import { AddRecipeButton } from "../recipes/helpers/AddRecipeButton";

export const UserProfile = ({ user }) => {
  const [statCounts, setStatCounts] = useState({
    mealCounts: {},
    timeCounts: {},
    recipeCount: 0,
    originalRecipeCount: 0,
    favoriteCount: 0,
    otherFavoriteCount: 0,
  });

  const getStatCounts = async () => {
    try {
      const responseBody = await getUserStats({ userId: user.id });
      setStatCounts(responseBody);
    } catch (error) {
      console.error(`Error in fetch for Stat Counts:`, error.message);
    }
  };

  useEffect(() => {
    getStatCounts();
  }, []);

  return (
    <>
      <div className="grid-x">
        <div className="cell medium-6">
          <h1>{user.username}</h1>
          <h3 className="subheader">
            <em>{user.createdAt ? `member since ${formatDate(user.createdAt)}` : null}</em>
          </h3>
          <h5>{statCounts.recipeCount} total recipes</h5>
          <h5>
            {statCounts.originalRecipeCount} <FontAwesomeIcon icon={faStar} className="yellow" />{" "}
            original recipes
          </h5>
          <h5>
            {statCounts.favoriteCount} <FontAwesomeIcon icon={faHeart} className="pink" /> favorite
            recipes
          </h5>
          <h5>
            {statCounts.otherFavoriteCount} <FontAwesomeIcon icon={faSeedling} className="teal" />{" "}
            recipes from others
          </h5>
        </div>

        <div className="cell medium-6">
          <div className="chart-container">
            <MealDonutChart mealCounts={statCounts.mealCounts} />
            <TimeDonutChart timeCounts={statCounts.timeCounts} />
          </div>

          <p className="cell medium-3 new-recipe-button">
            <AddRecipeButton />
          </p>
        </div>
      </div>

      <h3 className="text-center">Your recipe book</h3>
      <RecipeCollection userId={user.id} />
    </>
  );
};
