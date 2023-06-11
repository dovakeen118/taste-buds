import React from "react";

import { RadioButton } from "../../helpers/RadioButton";

export const MealOptions = ({ handleChange, recipeMeal }) => {
  const meals = ["breakfast", "snack", "lunch", "dessert", "dinner"];
  const mealOptions = meals.map((meal) => {
    return (
      <RadioButton
        key={meal}
        name="meal"
        value={meal}
        handleChange={handleChange}
        checked={recipeMeal === meal}
        labelClassName="cell medium-6"
      />
    );
  });

  return <div className="grid-x">{mealOptions}</div>;
};
