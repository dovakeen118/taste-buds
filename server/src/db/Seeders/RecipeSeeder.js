import { Recipe, User } from "../../models/index.js";

class RecipeSeeder {
  static async seed() {
    const exampleUser = await User.query().findOne({ email: "user@example.com" });
    const example1User = await User.query().findOne({ email: "user1@example.com" });

    const recipes = [
      {
        name: "Smoothie",
        meal: "snack",
        leftovers: false,
        tier: "quick",
        userId: exampleUser.id,
      },
      {
        name: "Broccoli Casserole",
        meal: "dinner",
        leftovers: true,
        tier: "average",
        favorite: true,
        userId: exampleUser.id,
      },
      {
        name: "Chili",
        meal: "dinner",
        leftovers: true,
        tier: "extended",
        favorite: true,
        userId: exampleUser.id,
      },
      {
        name: "Stir Fry",
        meal: "dinner",
        leftovers: true,
        tier: "extended",
        userId: example1User.id,
      },
    ];

    let seededCount = 0;
    for (const recipe of recipes) {
      const recipeRecord = await Recipe.query().findOne({
        name: recipe.name,
      });
      if (!recipeRecord) {
        if (await Recipe.query().insert(recipe)) {
          seededCount++;
        }
      }
    }

    console.log(`${seededCount} recipes seeded to the database`);
  }
}

export default RecipeSeeder;
