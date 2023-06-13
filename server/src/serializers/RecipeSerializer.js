import MeasurementSerializer from "./MeasurementSerializer.js";
import StepSerializer from "./StepSerializer.js";
import UserSerializer from "./UserSerializer.js";

class RecipeSerializer {
  static getList(recipes) {
    return recipes.map((recipe) => this.getDetails(recipe));
  }

  static async getDetailedList(recipes) {
    return await Promise.all(
      recipes.map(async (recipe) => RecipeSerializer.getShowDetails(recipe))
    );
  }

  static async getShowDetails(recipe) {
    const serializedRecipe = this.getDetails(recipe);
    const measurements = await recipe.$relatedQuery("measurements");
    const steps = await recipe.$relatedQuery("steps").orderBy("number");
    const user = await recipe.$relatedQuery("user");

    serializedRecipe.measurements = await MeasurementSerializer.getRecipeList(measurements);
    serializedRecipe.steps = StepSerializer.getList(steps);
    serializedRecipe.user = UserSerializer.getDetails(user);

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
      "favorite",
      "originalRecipeId",
      "userId",
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
