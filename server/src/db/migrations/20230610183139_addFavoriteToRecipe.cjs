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
    table.boolean("favorite").defaultTo(false);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  console.log(`Rolling back ${tableName}`);
  return knex.schema.table(tableName, (table) => {
    table.dropColumn("favorite");
  });
};
