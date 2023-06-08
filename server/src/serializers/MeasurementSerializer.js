import IngredientSerializer from "./IngredientSerializer.js";

class MeasurementSerializer {
  static async getRecipeList(measurements) {
    const serializedMeasurements = Promise.all(
      measurements.map(async (measurement) => this.getRecipeDetails(measurement))
    );

    return serializedMeasurements;
  }

  static async getRecipeDetails(measurement) {
    const serializedMeasurement = this.getDetails(measurement);
    const ingredient = await measurement.$relatedQuery("ingredient");
    serializedMeasurement.ingredient = IngredientSerializer.getDetails(ingredient);
    return serializedMeasurement;
  }

  static getDetails(measurement) {
    const allowedAttributes = ["id", "amount", "unit", "description"];

    let serializedMeasurement = {};
    for (const attribute of allowedAttributes) {
      serializedMeasurement[attribute] = measurement[attribute];
    }

    return serializedMeasurement;
  }
}

export default MeasurementSerializer;
