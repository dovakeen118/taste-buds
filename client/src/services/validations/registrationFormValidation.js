import config from "../../config";

export const registrationFormValidation = ({ userPayload, setErrors }) => {
  setErrors({});
  const { email, password, passwordConfirmation, username } = userPayload;
  const emailRegexp = config.validation.email.regexp.emailRegex;
  let newErrors = {};
  if (!email.match(emailRegexp)) {
    newErrors = {
      ...newErrors,
      email: "is invalid",
    };
  }

  if (username.trim() == "") {
    newErrors = {
      ...newErrors,
      username: "is required",
    };
  }

  if (password.trim() == "") {
    newErrors = {
      ...newErrors,
      password: "is required",
    };
  } else if (password.trim().length < 6) {
    newErrors = {
      ...newErrors,
      password: "must be at least 6 characters",
    };
  }

  if (passwordConfirmation.trim() === "") {
    newErrors = {
      ...newErrors,
      passwordConfirmation: "is required",
    };
  } else if (passwordConfirmation !== password) {
    newErrors = {
      ...newErrors,
      passwordConfirmation: "does not match password",
    };
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    return true;
  }
  return false;
};
