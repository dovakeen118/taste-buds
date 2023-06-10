import { Ingredient } from "../../models/index.js";

class IngredientSeeder {
  static async seed() {
    const ingredients = [
      {
        name: "chicken",
      },
      {
        name: "rice",
      },
      {
        name: "broccoli",
      },
      {
        name: "cheese",
      },
    ];

    let seededCount = 0;
    for (const ingredient of ingredients) {
      const ingredientRecord = await Ingredient.query().findOne({ name: ingredient.name });
      if (!ingredientRecord) {
        if (await Ingredient.query().insert(ingredient)) {
          seededCount++;
        }
      }
    }

    console.log(`${seededCount} ingredients seeded to the database`);
  }
}

export default IngredientSeeder;
