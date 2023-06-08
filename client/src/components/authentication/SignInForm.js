import React, { useState } from "react";

import signInFormValidation from "../../services/validations/signInFormValidation";

import FormError from "../layout/FormError";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const [credentialsErrors, setCredentialsErrors] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (signInFormValidation({ payload: userPayload, setErrors })) {
      try {
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
        const userData = await response.json();
        setShouldRedirect(true);
      } catch (err) {
        console.error(`Error in fetch for Sign In: ${err.message}`);
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
      <h1>Sign In</h1>

      {credentialsErrors ? <p className="callout alert">{credentialsErrors}</p> : null}

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
          <input type="submit" className="button" value="Sign In" />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
