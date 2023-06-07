const Model = require("./Model");

class Measurement extends Model {
  static get tableName() {
    return "measurements";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["amount", "unit"],
      properties: {
        amount: {
          anyOf: [{ type: "number", minimum: 0 }, { type: "string" }],
        },
        unit: { type: "string" },
        description: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Ingredient, Recipe } = require("./index");

    return {
      ingredient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Ingredient,
        join: {
          from: "measurements.ingredientId",
          to: "ingredients.id",
        },
      },
      recipe: {
        relation: Model.BelongsToOneRelation,
        modelClass: Recipe,
        join: {
          from: "measurements.recipeId",
          to: "recipes.id",
        },
      },
    };
  }
}

module.exports = Measurement;
