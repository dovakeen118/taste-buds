const signInFormValidation = ({ payload, setErrors }) => {
  setErrors({});
  const { username, password } = payload;
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

export default signInFormValidation;
