/* eslint-disable no-console */
const tableName = "steps";

/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  console.log(`Updating ${tableName}`);
  return knex.schema.table(tableName, (table) => {
    table.integer("number").notNullable();
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  console.log(`Rolling back ${tableName}`);
  return knex.schema.table(tableName, (table) => {
    table.dropColumn("number");
  });
};
