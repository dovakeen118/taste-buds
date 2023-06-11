import React from "react";

export const MeasurementIngredientList = (props) => {
  const measurements = props.measurements.map((measurement) => {
    let measurementDescription = "";
    if (measurement.description) {
      measurementDescription = `, ${measurement.description}`;
    }
    const measurementUnit = measurement.unit === "other" ? "" : measurement.unit;

    const output = `${Number(measurement.amount)} ${measurementUnit} ${
      measurement.ingredient.name
    }${measurementDescription}`;

    return <li key={measurement.id}>{output}</li>;
  });

  return (
    <div className="cell medium-6 callout">
      <h3>Ingredients</h3>
      {measurements.length > 0 ? <ul>{measurements}</ul> : <p>No ingredients for this recipe</p>}
    </div>
  );
};
