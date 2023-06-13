export const getRecipe = async ({ id, setNotFound }) => {
  const response = await fetch(`/api/v1/recipes/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      setNotFound(true);
    }
    throw new Error(`${response.status} (${response.statusText})`);
  }
  const responseBody = await response.json();
  return { recipe: responseBody.recipe };
};
