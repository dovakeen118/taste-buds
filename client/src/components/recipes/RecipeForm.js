import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { postRecipe } from "../../services/requests/postRecipe";
import { recipeFormValidation } from "../../services/validations/recipeFormValidation";

import { IngredientFormSection } from "../ingredients/IngredientFormSection";
import { ErrorList } from "../layout/ErrorList";
import { StepFormSection } from "../steps/StepFormSection";
import { RecipeDetailFormFields } from "./helpers/RecipeDetailFormFields";

export const RecipeForm = () => {
  const defaultIngredient = { name: "", amount: "", unit: "", description: "" };
  const defaultStep = { body: "" };
  const defaultFormState = {
    name: "",
    meal: "",
    tier: "",
    leftovers: false,
    servings: "",
    prepTime: "",
    cookTime: "",
    ingredients: [defaultIngredient],
    steps: [defaultStep],
  };
  const [recipe, setRecipe] = useState(defaultFormState);
  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState({ id: null, status: false });

  const handleChange = (event) => {
    setRecipe({
      ...recipe,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleCheckChange = (event) => {
    setRecipe({
      ...recipe,
      [event.currentTarget.name]: !recipe.leftovers,
    });
  };

  const handleIngredientChange = (event, index) => {
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients.slice(0, index),
        {
          ...recipe.ingredients[index],
          [event.currentTarget.name]: event.currentTarget.value,
        },
        ...recipe.ingredients.slice(index + 1),
      ],
    });
  };

  const handleStepChange = (event, index) => {
    setRecipe({
      ...recipe,
      steps: [
        ...recipe.steps.slice(0, index),
        {
          ...recipe.steps[index],
          [event.currentTarget.name]: event.currentTarget.value,
        },
        ...recipe.steps.slice(index + 1),
      ],
    });
  };

  const addToArray = (item, defaultItem) => {
    setRecipe({
      ...recipe,
      [item]: [...recipe[item], defaultItem],
    });
  };

  const removeItemAtIndex = (index, array) => {
    return array.filter((_, i) => i !== index);
  };

  const handleRemoveIngredient = (index) => {
    setRecipe({ ...recipe, ingredients: removeItemAtIndex(index, recipe.ingredients) });
  };

  const handleRemoveStep = (index) => {
    setRecipe({ ...recipe, steps: removeItemAtIndex(index, recipe.steps) });
  };

  const handleClear = () => {
    setErrors({});
    setRecipe(defaultFormState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (recipeFormValidation({ recipe, setErrors })) {
      try {
        const { recipeResponse } = await postRecipe({ payload: recipe, setErrors });
        setShouldRedirect({ id: recipeResponse.id, status: true });
      } catch (error) {
        console.error(`Error in fetch to post Recipe: ${error.message}`);
      }
    }
  };

  if (shouldRedirect.status) {
    return <Redirect push to={`/recipes/${shouldRedirect.id}`} />;
  }

  return (
    <>
      <h1 className="text-center">What's cookin', good lookin'?</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <RecipeDetailFormFields
          recipe={recipe}
          handleChange={handleChange}
          handleCheckChange={handleCheckChange}
          errors={errors}
        />
        <div className="grid-x grid-margin-x">
          <IngredientFormSection
            addToArray={addToArray}
            defaultIngredient={defaultIngredient}
            errors={errors}
            handleIngredientChange={handleIngredientChange}
            handleRemoveIngredient={handleRemoveIngredient}
            ingredients={recipe.ingredients}
          />
          <StepFormSection
            addToArray={addToArray}
            defaultStep={defaultStep}
            errors={errors}
            handleRemoveStep={handleRemoveStep}
            handleStepChange={handleStepChange}
            steps={recipe.steps}
          />
        </div>

        <div className="button-group expanded align-center">
          <button className="button hollow" type="button" onClick={handleClear}>
            Clear recipe
          </button>
          <input className="button" type="submit" value="Add recipe" />
        </div>
      </form>
    </>
  );
};
