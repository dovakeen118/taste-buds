const recipeFormValidation = ({ payload, setErrors }) => {
  setErrors({});
  const { name, meal, tier } = payload;
  let newErrors = {};

  if (name.trim() === "") {
    newErrors = {
      ...newErrors,
      Name: "is required",
    };
  }

  if (meal.trim() === "") {
    newErrors = {
      ...newErrors,
      Meal: "is required",
    };
  }

  if (tier.trim() === "") {
    newErrors = {
      ...newErrors,
      Tier: "is required",
    };
  }

  payload.ingredients.forEach((ingredient, index) => {
    if (ingredient.name.trim() === "") {
      newErrors = {
        ...newErrors,
        [`Ingredient ${index + 1} Name`]: "is required",
      };
    }
    if (ingredient.amount.trim() === "") {
      newErrors = {
        ...newErrors,
        [`Ingredient ${index + 1} Amount`]: "is required",
      };
    }
    if (ingredient.unit.trim() === "") {
      newErrors = {
        ...newErrors,
        [`Ingredient ${index + 1} Unit`]: "is required",
      };
    }
  });

  payload.steps.forEach((step, index) => {
    if (step.body.trim() === "") {
      newErrors = {
        ...newErrors,
        [`Step ${index + 1} Body`]: "is required",
      };
    }
  });

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    return true;
  }
  return false;
};

export default recipeFormValidation;
