/* eslint-disable no-console */
import { connection } from "../boot.js";

import IngredientSeeder from "./Seeders/IngredientSeeder.js";
import MeasurementSeeder from "./Seeders/MeasurementSeeder.js";
import RecipeSeeder from "./Seeders/RecipeSeeder.js";
import StepSeeder from "./Seeders/StepSeeder.js";
import UserSeeder from "./Seeders/UserSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding Users...");
    await UserSeeder.seed();

    console.log("Seeding Ingredients...");
    await IngredientSeeder.seed();

    console.log("Seeding Recipes...");
    await RecipeSeeder.seed();

    console.log("Seeding Measurements...");
    await MeasurementSeeder.seed();

    console.log("Seeding Steps...");
    await StepSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
