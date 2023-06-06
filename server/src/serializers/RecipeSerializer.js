class RecipeSerializer {
  static getList(recipes) {
    const serializedRecipes = recipes.map((recipe) => this.getDetails(recipe));

    return serializedRecipes;
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
