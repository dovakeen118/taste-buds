import React from "react";

const MeasurementIngredientList = (props) => {
  const measurements = props.measurements.map((measurement) => {
    let measurementDescription = "";
    if (measurement.description) {
      measurementDescription = `, ${measurement.description}`;
    }
    const output = `${Number(measurement.amount)} ${measurement.unit} ${
      measurement.ingredient.name
    }${measurementDescription}`;

    return <li key={measurement.id}>{output}</li>;
  });

  return (
    <div className="cell medium-6">
      <h3>Ingredients</h3>
      <ul>{measurements}</ul>
    </div>
  );
};

export default MeasurementIngredientList;
