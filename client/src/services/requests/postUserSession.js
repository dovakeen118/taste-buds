export const postUserSession = async ({ userPayload, setCredentialsErrors }) => {
  const response = await fetch("/api/v1/user-sessions", {
    method: "POST",
    body: JSON.stringify(userPayload),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  if (!response.ok) {
    if (response.status === 401) {
      const serverErrors = await response.json();
      setCredentialsErrors(serverErrors.message);
    }
    throw new Error(`${response.status} (${response.statusText})`);
  }
  const user = await response.json();
  return { user };
};
