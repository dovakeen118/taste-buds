export const deleteUserSession = async () => {
  const response = await fetch("/api/v1/user-sessions", {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  const responseBody = await response.json();
  return { responseBody };
};
