import { translateServerErrors } from "../translateServerErrors";

export const postRecipe = async ({ payload, setErrors }) => {
  const response = await fetch("/api/v1/recipes", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    if (response.status === 422) {
      const errorBody = await response.json();
      const serverErrors = translateServerErrors(errorBody.errors);
      setErrors(serverErrors);
    }
  } else {
    const responseBody = await response.json();
    return { recipeResponse: responseBody.recipe };
  }
};
