import { Recipe, Step } from "../../models/index.js";

class StepSeeder {
  static async seed() {
    const casserole = await Recipe.query().findOne({ name: "Broccoli Casserole" });
    const smoothie = await Recipe.query().findOne({ name: "Smoothie" });

    const steps = [
      {
        body: "Pre-heat oven to 350F. Season chicken with salt, pepper, and garlic powder, then bake for about 20 minutes.",
        recipeId: casserole.id,
      },
      {
        body: "Chop veggies into bite sized pieces and lightly bake, cook, or steam.",
        recipeId: casserole.id,
      },
      {
        body: "Make cheese sauce...",
        recipeId: casserole.id,
      },
      {
        body: "Cut chicken into bite sized pieces. Mix chicken and veggies into a tall casserole dish, and mix in cheese. Cover with crushed Ritz crackers, then bake until golden brown (5-10 minutes).",
        recipeId: casserole.id,
      },
      {
        body: "Blend that shit",
        recipeId: smoothie.id,
      },
    ];

    let seededCount = 0;
    for (const step of steps) {
      const stepRecord = await Step.query().findOne({
        body: step.body,
        recipeId: step.recipeId,
      });
      if (!stepRecord) {
        if (await Step.query().insert(step)) {
          seededCount++;
        }
      }
    }

    console.log(`${seededCount} steps seeded to the database`);
  }
}

export default StepSeeder;
