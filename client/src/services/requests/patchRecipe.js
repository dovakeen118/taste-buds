export const patchRecipe = async ({ id, payload }) => {
  const response = await fetch(`/api/v1/recipes/${id}`, {
    method: "PATCH",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  const responseBody = await response.json();
  return { recipe: responseBody.recipe };
};
