/* eslint-disable no-console */
import { connection } from "../boot.js";

import UserSeeder from "./Seeders/UserSeeder.js";
import RecipeSeeder from "./Seeders/RecipeSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding Users...");
    await UserSeeder.seed();

    console.log("Seeding Recipes...");
    await RecipeSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
