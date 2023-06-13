export const getRecipes = async () => {
  const response = await fetch("/api/v1/recipes");
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  const responseBody = await response.json();
  return { recipes: responseBody.recipes };
};
