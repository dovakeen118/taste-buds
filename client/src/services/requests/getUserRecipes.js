export const getUserRecipes = async ({ userId, options }) => {
  const response = await fetch(`/api/v1/users/${userId}/recipes?filterOptions=${options}`);
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  const responseBody = await response.json();
  return { userRecipes: responseBody.recipes };
};
