/* eslint-disable no-console */
const tableName = "measurements";

/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    console.log(`Creating ${tableName}`);
    return knex.schema.createTable(tableName, (table) => {
      table.bigIncrements("id");
      table.decimal("amount").notNullable();
      table.string("unit").notNullable();
      table.string("description");
      table
        .bigInteger("ingredientId")
        .notNullable()
        .index()
        .unsigned()
        .references("ingredients.id");
      table.bigInteger("recipeId").notNullable().index().unsigned().references("recipes.id");
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    });
  }

  console.log(`${tableName} already exists; skipping`);
  return 1;
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  console.log(`Rolling back ${tableName}`);
  return knex.schema.dropTableIfExists(tableName);
};
