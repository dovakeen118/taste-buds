import RecipeSerializer from "./RecipeSerializer.js";

class UserSerializer {
  static async getProfileDetails(user) {
    const serializedUser = this.getDetails(user);
    const recipes = await user.$relatedQuery("recipes");
    serializedUser.recipes = await RecipeSerializer.getDetailedList(recipes);

    return serializedUser;
  }

  static getDetails(user) {
    const allowedAttributes = ["id", "username", "createdAt"];

    let serializedUser = {};
    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute];
    }

    return serializedUser;
  }
}

export default UserSerializer;
