import express from "express";

import RecipeHelper from "../../../services/RecipeHelper.js";
import RecipeSerializer from "../../../serializers/RecipeSerializer.js";
import { User } from "../../../models/index.js";

const userRecipesRouter = new express.Router({ mergeParams: true });

userRecipesRouter.get("/", async (req, res) => {
  try {
    const { userId } = req.params;
    const { filterOptions } = req.query;
    const user = await User.query().findById(userId);
    const query = user.$relatedQuery("recipes");
    const filteredRecipes = await RecipeHelper.filter({ query, filterOptions });
    const serializedRecipes = await RecipeSerializer.getDetailedList(filteredRecipes);
    return res.status(200).json({ recipes: serializedRecipes });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

userRecipesRouter.get("/stat-counts", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.query().findById(userId);
    const recipes = await user.$relatedQuery("recipes");
    const mealCounts = RecipeSerializer.getMealCounts(recipes);
    const timeCounts = RecipeSerializer.getTimeCounts(recipes);
    const recipeCount = recipes.length;
    const [{ count: originalRecipeCount }] = await user
      .$relatedQuery("recipes")
      .whereNull("originalRecipeId")
      .count();
    const [{ count: favoriteCount }] = await user
      .$relatedQuery("recipes")
      .where({ favorite: true })
      .count();
    const [{ count: otherFavoriteCount }] = await user
      .$relatedQuery("recipes")
      .whereNotNull("originalRecipeId")
      .count();

    return res.status(200).json({
      mealCounts,
      timeCounts,
      recipeCount,
      originalRecipeCount,
      favoriteCount,
      otherFavoriteCount,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default userRecipesRouter;
