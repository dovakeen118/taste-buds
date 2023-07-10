export const getUserStats = async ({ userId }) => {
  const response = await fetch(`/api/v1/users/${userId}/recipes/stat-counts`);
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  const responseBody = await response.json();
  return responseBody;
};
