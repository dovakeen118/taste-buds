import config from "../../config";

const signInFormValidation = ({ payload, setErrors }) => {
  setErrors({});
  const { email, password } = payload;
  const emailRegexp = config.validation.email.regexp;
  let newErrors = {};
  if (!email.match(emailRegexp)) {
    newErrors = {
      ...newErrors,
      email: "is invalid",
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
