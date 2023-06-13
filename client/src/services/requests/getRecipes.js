export const getRecipes = async ({ options }) => {
  const response = await fetch(`/api/v1/recipes?filterOptions=${options}`);
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  const responseBody = await response.json();
  return { recipes: responseBody.recipes };
};
