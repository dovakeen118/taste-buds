import RecipeSerializer from "./RecipeSerializer.js";

class UserSerializer {
  static async getProfileDetails(user) {
    const serializedUser = this.getDetails(user);
    const recipes = await user.$relatedQuery("recipes");
    serializedUser.recipes = await Promise.all(
      recipes.map(async (recipe) => RecipeSerializer.getShowDetails(recipe))
    );

    return serializedUser;
  }

  static getDetails(user) {
    const allowedAttributes = ["id", "email", "createdAt"];

    let serializedUser = {};
    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute];
    }

    return serializedUser;
  }
}

export default UserSerializer;
