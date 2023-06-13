import { translateServerErrors } from "../translateServerErrors";

export const postUser = async ({ userPayload, setServerErrors }) => {
  const response = await fetch("/api/v1/users", {
    method: "POST",
    body: JSON.stringify(userPayload),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  if (!response.ok) {
    if (response.status === 422) {
      const errorBody = await response.json();
      const newServerErrors = translateServerErrors(errorBody.errors);
      setServerErrors(newServerErrors);
    }
    throw new Error(`${response.status} (${response.statusText})`);
  }
  const user = await response.json();
  return { user };
};
