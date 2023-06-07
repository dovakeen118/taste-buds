const Model = require("./Model");

class Recipe extends Model {
  static get tableName() {
    return "recipes";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "leftovers", "meal", "tier"],
      properties: {
        name: { type: "string" },
        leftovers: {
          anyOf: [{ type: "boolean" }, { type: "string" }],
        },
        meal: { type: "string", enum: ["breakfast", "lunch", "dinner", "snack", "dessert"] },
        tier: { type: "string", enum: ["quick", "average", "extended"] },
        servings: {
          anyOf: [{ type: "integer", minimum: 0 }, { type: "string" }],
        },
        prepTime: {
          anyOf: [{ type: "integer", minimum: 0 }, { type: "string" }],
        },
        cookTime: {
          anyOf: [{ type: "integer", minimum: 0 }, { type: "string" }],
        },
      },
    };
  }

  static get relationMappings() {
    const { Ingredient, User, Measurement } = require("./index");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "recipes.userId",
          to: "users.id",
        },
      },
      measurements: {
        relation: Model.HasManyRelation,
        modelClass: Measurement,
        join: {
          from: "recipes.id",
          to: "measurements.recipeId",
        },
      },
      ingredients: {
        relation: Model.ManyToManyRelation,
        modelClass: Ingredient,
        join: {
          from: "recipes.id",
          through: {
            from: "measurements.recipeId",
            to: "measurements.ingredientId",
          },
          to: "ingredients.id",
        },
      },
    };
  }
}

module.exports = Recipe;
