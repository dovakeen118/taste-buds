/* eslint-disable no-console */
const tableName = "recipes";

/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  console.log(`Updating ${tableName}`);
  return knex.schema.table(tableName, (table) => {
    table.bigInteger("originalRecipeId").index().unsigned().references("recipes.id");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  console.log(`Rolling back ${tableName}`);
  return knex.schema.table(tableName, (table) => {
    table.dropColumn("originalRecipeId");
  });
};
