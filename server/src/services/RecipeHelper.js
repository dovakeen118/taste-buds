import { Ingredient, Recipe } from "../models/index.js";
import cleanUserInput from "./cleanUserInput.js";

class RecipeHelper {
  static async create({
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
  }) {
    const cleanedRecipeInput = cleanUserInput({
      name,
      meal,
      tier,
      servings,
      leftovers,
      prepTime,
      cookTime,
    });
    return await Recipe.transaction(async (trx) => {
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
  }

  static async copy({ originalRecipeId, userId }) {
    return await Recipe.transaction(async (trx) => {
      const originalRecipe = await Recipe.query(trx).findById(originalRecipeId);
      const cleanedRecipeInput = cleanUserInput({
        ...originalRecipe,
        id: null,
        userId: userId,
        originalRecipeId,
      });
      const measurements = await originalRecipe.$relatedQuery("measurements", trx);
      const steps = await originalRecipe.$relatedQuery("steps", trx);
      const newRecipe = await Recipe.query(trx).insertAndFetch(cleanedRecipeInput);

      for (const measurement of measurements) {
        const cleanedMeasurement = cleanUserInput({
          ...measurement,
          id: null,
          recipeId: newRecipe.id,
        });

        await newRecipe.$relatedQuery("measurements", trx).insert(cleanedMeasurement);
      }

      for (const step of steps) {
        const cleanedStep = cleanUserInput({ ...step, id: null, recipeId: newRecipe.id });
        await newRecipe.$relatedQuery("steps", trx).insert(cleanedStep);
      }

      return newRecipe;
    });
  }

  static async filter({ query, filterOptions }) {
    const options = filterOptions?.split(",");
    const selections = { favorites: false, meals: [], tiers: [] };
    if (options) {
      options.includes("favorites") ? (selections.favorites = true) : null;
      options.includes("breakfast") ? selections.meals.push("breakfast") : null;
      options.includes("lunch") ? selections.meals.push("lunch") : null;
      options.includes("dinner") ? selections.meals.push("dinner") : null;
      options.includes("snack") ? selections.meals.push("snack") : null;
      options.includes("dessert") ? selections.meals.push("dessert") : null;
      options.includes("quick") ? selections.tiers.push("quick") : null;
      options.includes("average") ? selections.tiers.push("average") : null;
      options.includes("extended") ? selections.tiers.push("extended") : null;

      if (selections.favorites) {
        query.where({ favorite: true });
      }
      if (selections.meals.length > 0) {
        query.whereIn("meal", selections.meals);
      }
      if (selections.tiers.length > 0) {
        query.whereIn("tier", selections.tiers);
      }
    }

    const recipes = await query;
    return recipes;
  }
}

export default RecipeHelper;
