import express from "express";
import { NotFoundError, ValidationError } from "objection";

import cleanUserInput from "../../../services/cleanUserInput.js";

import { Recipe, Ingredient } from "../../../models/index.js";
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
  const { name, meal, tier, servings, leftovers, prepTime, cookTime, ingredients, steps } =
    req.body;
  const userId = req.user.id;
  try {
    const cleanedRecipeInput = cleanUserInput({
      name,
      meal,
      tier,
      servings,
      leftovers,
      prepTime,
      cookTime,
    });
    const createdRecipe = await Recipe.transaction(async (trx) => {
      const recipe = await Recipe.query(trx).insertAndFetch({ ...cleanedRecipeInput, userId });
      for (const ingredient of ingredients) {
        const { name: ingredientName, amount, unit, description } = cleanUserInput(ingredient);
        const foundIngredient =
          (await Ingredient.query(trx)
            .findOne({
              name: ingredientName,
            })
            .skipUndefined()) ||
          (await Ingredient.query(trx).insertAndFetch({ name: ingredientName }));

        await recipe.$relatedQuery("measurements", trx).insert({
          recipeId: recipe.id,
          ingredientId: foundIngredient.id,
          amount,
          unit,
          description,
        });
      }

      for (const [index, step] of steps.entries()) {
        const { body } = cleanUserInput(step);
        await recipe.$relatedQuery("steps", trx).insert({ body, number: index + 1 });
      }

      return recipe;
    });

    const serializedRecipe = RecipeSerializer.getDetails(createdRecipe);
    return res.status(201).json({ recipe: serializedRecipe });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
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
