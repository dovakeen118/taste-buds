import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import translateServerErrors from "../../services/translateServerErrors";

import ErrorList from "../layout/ErrorList";
import RadioButton from "../helpers/RadioButton";

const RecipeForm = (props) => {
  const defaultFormState = {
    name: "",
    meal: "",
    tier: "",
    leftovers: false,
    servings: "",
    prepTime: "",
    cookTime: "",
  };
  const [recipe, setRecipe] = useState(defaultFormState);
  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

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

  const handleClear = () => {
    setRecipe(defaultFormState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        const responseBody = response.json();
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(`Error in fetch to post Recipe: ${error.message}`);
    }
  };

  const meals = ["breakfast", "snack", "lunch", "dessert", "dinner"];
  const mealOptions = meals.map((meal) => {
    return (
      <RadioButton
        key={meal}
        name="meal"
        data={meal}
        handleChange={handleChange}
        checked={recipe.meal === meal}
        labelClassName="cell medium-6"
      />
    );
  });

  const tiers = ["quick", "average", "extended"];
  const tierOptions = tiers.map((tier) => {
    return (
      <RadioButton
        key={tier}
        name="tier"
        data={tier}
        handleChange={handleChange}
        checked={recipe.tier === tier}
      />
    );
  });

  if (shouldRedirect) {
    return <Redirect push to="/" />;
  }

  return (
    <div className="callout primary">
      <h1>What's cookin', good lookin'?</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Recipe name {errors["Name"] ? <span>*</span> : null}
            <input type="text" id="name" name="name" onChange={handleChange} value={recipe.name} />
          </label>
        </div>

        <div className="grid-x grid-margin-x">
          <div className="cell small-6">
            Typical meal {errors["Meal"] ? <span>*</span> : null}
            <div className="grid-x">{mealOptions}</div>
          </div>

          <div className="cell small-6">
            Tier for time? {errors["Tier"] ? <span>*</span> : null}
            {tierOptions}
          </div>
        </div>

        <div className="grid-x grid-margin-x">
          <div className="cell small-6">
            <label htmlFor="servings">
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
          </div>

          <div className="cell small-6">
            Good for leftovers? {errors["Leftovers"] ? <span>*</span> : null}
            <label htmlFor="leftovers">
              <input
                type="checkbox"
                id="leftovers"
                name="leftovers"
                onChange={handleCheckChange}
                checked={recipe.leftovers === true}
              />
            </label>
          </div>
        </div>

        <div className="grid-x grid-margin-x">
          <div className="cell small-6">
            <label htmlFor="prepTime">
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
          </div>

          <div className="cell small-6">
            <label htmlFor="cookTime">
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
        </div>

        <div className="button-group">
          <input className="button" type="submit" value="Add" />
          <button className="button" type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
