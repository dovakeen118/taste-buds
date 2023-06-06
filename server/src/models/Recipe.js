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
        leftovers: { type: ["boolean", "string"] },
        meal: { type: "string", enum: ["breakfast", "lunch", "dinner", "snack", "dessert"] },
        tier: { type: "string", enum: ["quick", "average", "extended"] },
        servings: { type: ["integer", "string"] },
        prepTime: { type: ["integer", "string"] },
        cookTime: { type: ["integer", "string"] },
      },
    };
  }

  static get relationMappings() {
    const { User } = require("./index");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "recipes.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Recipe;
