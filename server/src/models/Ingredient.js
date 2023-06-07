const Model = require("./Model");
const unique = require("objection-unique");

const uniqueFunc = unique({
  fields: ["name"],
  identifiers: ["id"],
});

class Ingredient extends uniqueFunc(Model) {
  static get tableName() {
    return "ingredients";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Measurement, Recipe } = require("./index");

    return {
      measurements: {
        relation: Model.HasManyRelation,
        modelClass: Measurement,
        join: {
          from: "ingredients.id",
          to: "measurements.ingredientsId",
        },
      },
      recipes: {
        relation: Model.ManyToManyRelation,
        modelClass: Recipe,
        join: {
          from: "ingredients.id",
          through: {
            from: "measurements.ingredientId",
            to: "measurements.recipeId",
          },
          to: "recipes.id",
        },
      },
    };
  }
}

module.exports = Ingredient;
