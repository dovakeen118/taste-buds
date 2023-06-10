import MeasurementSerializer from "./MeasurementSerializer.js";
import StepSerializer from "./StepSerializer.js";

class RecipeSerializer {
  static getList(recipes) {
    return recipes.map((recipe) => this.getDetails(recipe));
  }

  static async getShowDetails(recipe) {
    const serializedRecipe = this.getDetails(recipe);
    const measurements = await recipe.$relatedQuery("measurements");
    const steps = await recipe.$relatedQuery("steps");

    serializedRecipe.measurements = await MeasurementSerializer.getRecipeList(measurements);
    serializedRecipe.steps = StepSerializer.getList(steps);

    return serializedRecipe;
  }

  static getDetails(recipe) {
    const allowedAttributes = [
      "id",
      "name",
      "meal",
      "tier",
      "leftovers",
      "servings",
      "prepTime",
      "cookTime",
      "updatedAt",
    ];

    let serializedRecipe = {};
    for (const attribute of allowedAttributes) {
      serializedRecipe[attribute] = recipe[attribute];
    }

    return serializedRecipe;
  }
}

export default RecipeSerializer;
