const getCurrentUser = async () => {
  const response = await fetch("/api/v1/user-sessions/current", {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }
  const userData = await response.json();
  return userData;
};

export default getCurrentUser;
