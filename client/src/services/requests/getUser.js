export const getUser = async ({ userId }) => {
  const response = await fetch(`/api/v1/users/${userId}`);
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  const responseBody = await response.json();
  return { user: responseBody.user };
};
