/* eslint-disable no-console */
const tableName = "recipes";

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
      table.string("name").notNullable();
      table.enu("meal", ["breakfast", "lunch", "dinner", "snack", "dessert"]).notNullable();
      table.enu("tier", ["quick", "average", "extended"]).notNullable();
      table.boolean("leftovers").notNullable();
      table.integer("servings");
      table.integer("prepTime");
      table.integer("cookTime");
      table
        .bigInteger("userId")
        .notNullable()
        .index()
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE");
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
