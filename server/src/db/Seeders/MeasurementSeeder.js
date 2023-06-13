import { Recipe, Ingredient, Measurement } from "../../models/index.js";

class MeasurementSeeder {
  static async seed() {
    const broccoli = await Ingredient.query().findOne({ name: "broccoli" });
    const chicken = await Ingredient.query().findOne({ name: "chicken" });
    const rice = await Ingredient.query().findOne({ name: "rice" });
    const cheese = await Ingredient.query().findOne({ name: "cheese" });
    const casserole = await Recipe.query().findOne({ name: "Chicken Broccoli Casserole" });
    const stirFry = await Recipe.query().findOne({ name: "Stir Fry" });

    const measurements = [
      {
        amount: 3,
        unit: "heads",
        ingredientId: broccoli.id,
        recipeId: casserole.id,
      },
      {
        amount: 1.5,
        unit: "lbs",
        ingredientId: chicken.id,
        recipeId: casserole.id,
      },
      {
        amount: 1,
        unit: "cup",
        description: "uncooked",
        ingredientId: rice.id,
        recipeId: casserole.id,
      },
      {
        amount: 1,
        unit: "cup",
        description: "grated",
        ingredientId: cheese.id,
        recipeId: casserole.id,
      },
      {
        amount: 2,
        unit: "heads",
        ingredientId: broccoli.id,
        recipeId: stirFry.id,
      },
      {
        amount: 1,
        unit: "lbs",
        ingredientId: chicken.id,
        recipeId: stirFry.id,
      },
      {
        amount: 1,
        unit: "cup",
        description: "uncooked",
        ingredientId: rice.id,
        recipeId: stirFry.id,
      },
    ];

    let seededCount = 0;
    for (const measurement of measurements) {
      const measurementRecord = await Measurement.query().findOne({
        ingredientId: measurement.ingredientId,
        recipeId: measurement.recipeId,
      });
      if (!measurementRecord) {
        if (await Measurement.query().insert(measurement)) {
          seededCount++;
        }
      }
    }

    console.log(`${seededCount} measurements seeded to the database`);
  }
}

export default MeasurementSeeder;
