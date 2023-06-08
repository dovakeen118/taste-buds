import React, { useState } from "react";

import translateServerErrors from "../../services/translateServerErrors";
import registrationFormValidation from "../../services/validations/registrationFormValidation";

import ErrorList from "../layout/ErrorList";
import FormError from "../layout/FormError";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    setServerErrors({});

    if (registrationFormValidation({ payload: userPayload, setErrors })) {
      try {
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
        const userData = await response.json();
        setShouldRedirect(true);
      } catch (err) {
        console.error(`Error in fetch for Registration: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container">
      <h1>Register</h1>
      <ErrorList errors={serverErrors} />
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
