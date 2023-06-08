import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import translateServerErrors from "../../services/translateServerErrors";
import recipeFormValidation from "../../services/validations/recipeFormValidation";

import ErrorList from "../layout/ErrorList";
import RadioButton from "../helpers/RadioButton";
import IngredientFormFields from "../ingredients/IngredientFormFields";

const RecipeForm = (props) => {
  const defaultIngredient = { name: "", amount: "", unit: "", description: "" };
  const defaultFormState = {
    name: "",
    meal: "",
    tier: "",
    leftovers: false,
    servings: "",
    prepTime: "",
    cookTime: "",
    ingredients: [defaultIngredient],
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

  const handleCheckChange = (event) => {
    setRecipe({
      ...recipe,
      [event.currentTarget.name]: !recipe.leftovers,
    });
  };

  const handleAddIngredient = (event) => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, defaultIngredient],
    });
  };

  const handleRemoveIngredient = (index) => {
    setRecipe({ ...recipe, ingredients: recipe.ingredients.filter((_, i) => i !== index) });
  };

  const handleClear = () => {
    setRecipe(defaultFormState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (recipeFormValidation({ payload: recipe, setErrors })) {
      try {
        const response = await fetch("/api/v1/recipes", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(recipe),
        });
        if (!response.ok) {
          if (response.status === 422) {
            const errorBody = await response.json();
            const serverErrors = translateServerErrors(errorBody.errors);
            setErrors(serverErrors);
          }
        } else {
          const responseBody = await response.json();
          setShouldRedirect({ id: responseBody.recipe.id, status: true });
        }
      } catch (error) {
        console.error(`Error in fetch to post Recipe: ${error.message}`);
      }
    }
  };

  const meals = ["breakfast", "snack", "lunch", "dessert", "dinner"];
  const mealOptions = meals.map((meal) => {
    return (
      <RadioButton
        key={meal}
        name="meal"
        value={meal}
        handleChange={handleChange}
        checked={recipe.meal === meal}
        labelClassName="cell medium-6"
      />
    );
  });

  const tiers = [
    { name: "quick", description: "< 10" },
    { name: "average", description: "10 - 20" },
    { name: "extended", description: "> 20" },
  ];
  const tierOptions = tiers.map((tier) => {
    return (
      <RadioButton
        key={tier.name}
        name="tier"
        value={tier.name}
        labelText={`${tier.name} ( ${tier.description} minutes )`}
        handleChange={handleChange}
        checked={recipe.tier === tier.name}
      />
    );
  });

  const ingredientFields = recipe.ingredients.map((ingredient, index) => {
    return (
      <IngredientFormFields
        key={index}
        ingredient={ingredient}
        numIngredients={recipe.ingredients.length}
        handleIngredientChange={(event) => handleIngredientChange(event, index)}
        handleRemoveIngredient={handleRemoveIngredient}
        index={index}
        errors={errors}
      />
    );
  });

  if (shouldRedirect.status) {
    return <Redirect push to={`/recipes/${shouldRedirect.id}`} />;
  }

  return (
    <>
      <h1 className="text-center">What's cookin', good lookin'?</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit} className="callout primary">
        <div>
          <label htmlFor="name">
            Recipe name {errors["Name"] ? <span>*</span> : null}
            <input type="text" id="name" name="name" onChange={handleChange} value={recipe.name} />
          </label>
        </div>

        <div className="grid-x grid-margin-x">
          <div className="cell medium-6 callout">
            Typical meal {errors["Meal"] ? <span>*</span> : null}
            <div className="grid-x">{mealOptions}</div>
          </div>

          <div className="cell medium-6 callout">
            Tier for time? {errors["Tier"] ? <span>*</span> : null}
            {tierOptions}
          </div>
        </div>

        <div className="grid-x grid-margin-x">
          <label htmlFor="leftovers" className="cell small-6 medium-3">
            <input
              type="checkbox"
              id="leftovers"
              name="leftovers"
              onChange={handleCheckChange}
              checked={recipe.leftovers === true}
            />
            Good for leftovers? {errors["Leftovers"] ? <span>*</span> : null}
          </label>

          <label htmlFor="servings" className="cell small-6 medium-3">
            Number of servings? {errors["Servings"] ? <span>*</span> : null}
            <input
              type="number"
              id="servings"
              name="servings"
              onChange={handleChange}
              value={recipe.servings}
              min={0}
            />
          </label>

          <label htmlFor="prepTime" className="cell small-6 medium-3">
            Prep time (minutes) {errors["PrepTime"] ? <span>*</span> : null}
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              onChange={handleChange}
              value={recipe.prepTime}
              min={0}
            />
          </label>

          <label htmlFor="cookTime" className="cell small-6 medium-3">
            Cook time (minutes) {errors["CookTime"] ? <span>*</span> : null}
            <input
              type="number"
              id="cookTime"
              name="cookTime"
              onChange={handleChange}
              value={recipe.cookTime}
              min={0}
            />
          </label>
        </div>

        <h3>Ingredients</h3>

        {ingredientFields}

        <button className="button" type="button" onClick={handleAddIngredient}>
          Add ingredient
        </button>

        <div className="button-group">
          <input className="button" type="submit" value="Add" />
          <button className="button" type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </>
  );
};

export default RecipeForm;
