export const signInFormValidation = ({ userPayload, setErrors }) => {
  setErrors({});
  const { username, password } = userPayload;
  let newErrors = {};

  if (username.trim() === "") {
    newErrors = {
      ...newErrors,
      username: "is required",
    };
  }

  if (password.trim() === "") {
    newErrors = {
      ...newErrors,
      password: "is required",
    };
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    return true;
  }
  return false;
};
