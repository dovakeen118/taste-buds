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

export default userRecipesRouter;
