import express from "express";
import { ValidationError } from "objection";

import cleanUserInput from "../../../services/cleanUserInput.js";

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

recipesRouter.post("/", async (req, res) => {
  const { name, meal, tier, servings, leftovers, prepTime, cookTime } = req.body;
  const userId = req.user.id;
  try {
    const cleanedInput = cleanUserInput({
      name,
      meal,
      tier,
      servings,
      leftovers,
      prepTime,
      cookTime,
    });
    const recipe = await Recipe.query().insertAndFetch({ ...cleanedInput, userId });
    const serializedRecipe = RecipeSerializer.getDetails(recipe);
    return res.status(201).json({ recipe: serializedRecipe });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default recipesRouter;
