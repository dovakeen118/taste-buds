import express from "express";
import { NotFoundError, ValidationError } from "objection";

import cleanUserInput from "../../../services/cleanUserInput.js";

import { Recipe } from "../../../models/index.js";
import RecipeHelper from "../../../services/RecipeHelper.js";
import RecipeSerializer from "../../../serializers/RecipeSerializer.js";

const recipesRouter = new express.Router();

recipesRouter.get("/", async (req, res) => {
  const { filterOptions } = req.query;
  try {
    const query = Recipe.query();
    const filteredRecipes = await RecipeHelper.filter({ query, filterOptions });
    const serializedRecipes = await RecipeSerializer.getList(filteredRecipes);
    return res.status(200).json({ recipes: serializedRecipes });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

recipesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.query().findById(id).throwIfNotFound();
    const serializedRecipe = await RecipeSerializer.getShowDetails(recipe);

    return res.status(200).json({ recipe: serializedRecipe });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

recipesRouter.post("/", async (req, res) => {
  if (req.body.originalRecipeId) {
    const { originalRecipeId } = req.body;
    try {
      const createdRecipe = await RecipeHelper.copy({
        originalRecipeId,
        userId: req.user.id,
      });
      const serializedRecipe = await RecipeSerializer.getDetails(createdRecipe);
      return res.status(201).json({ recipe: serializedRecipe });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).json({ errors: error.data });
      }
      return res.status(500).json({ errors: error });
    }
  } else {
    const { name, meal, tier, servings, leftovers, prepTime, cookTime, ingredients, steps } =
      req.body;
    const userId = req.user.id;
    try {
      const createdRecipe = await RecipeHelper.create({
        name,
        meal,
        tier,
        servings,
        leftovers,
        prepTime,
        cookTime,
        ingredients,
        steps,
        userId,
      });

      const serializedRecipe = await RecipeSerializer.getDetails(createdRecipe);
      return res.status(201).json({ recipe: serializedRecipe });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).json({ errors: error.data });
      }
      return res.status(500).json({ errors: error });
    }
  }
});

recipesRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.query().findById(id);
    if (req.user && req.user.id === recipe.userId) {
      const { favorite } = req.body;
      const cleanedInput = cleanUserInput(favorite);
      const updatedRecipe = await Recipe.query().patchAndFetchById(id, { favorite: cleanedInput });
      const serializedRecipe = await RecipeSerializer.getShowDetails(updatedRecipe);
      return res.status(200).json({ recipe: serializedRecipe });
    } else {
      return res.status(401).json({ message: "this must be your recipe" });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default recipesRouter;
