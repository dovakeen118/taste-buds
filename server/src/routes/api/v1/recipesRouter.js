import express from "express";

import { Recipe } from "../../../models/index.js";
import RecipeSerializer from "../../../serializers/RecipeSerializer.js";

const recipesRouter = new express.Router();

recipesRouter.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.query();
    const serializedRecipes = RecipeSerializer.getList(recipes);
    return res.status(200).json({ recipes: serializedRecipes });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default recipesRouter;
