// include all of your models here using CommonJS requires
const Ingredient = require("./Ingredient.js");
const Measurement = require("./Measurement");
const Recipe = require("./Recipe.js");
const Step = require("./Step.js");
const User = require("./User.js");

module.exports = { Ingredient, Measurement, Recipe, Step, User };
