const Model = require("./Model");

class Step extends Model {
  static get tableName() {
    return "steps";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["body", "number"],
      properties: {
        body: { type: "string" },
        number: { anyOf: [{ type: "integer", minimum: 0 }, { type: "string" }] },
      },
    };
  }

  static get relationMappings() {
    const { Recipe } = require("./index");

    return {
      recipe: {
        relation: Model.BelongsToOneRelation,
        modelClass: Recipe,
        join: {
          from: "steps.recipeId",
          to: "recipes.id",
        },
      },
    };
  }
}

module.exports = Step;
