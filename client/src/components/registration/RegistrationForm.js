import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

import { postUser } from "../../services/requests/postUser";
import { registrationFormValidation } from "../../services/validations/registrationFormValidation";

import { ErrorList } from "../layout/ErrorList";
import { FormError } from "../layout/FormError";

export const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    username: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    setServerErrors({});

    if (registrationFormValidation({ userPayload, setErrors })) {
      try {
        const { user } = await postUser({ userPayload, setServerErrors });
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
    <div className="passport-form">
      <h1 className="text-center">
        Join Taste Buds <FontAwesomeIcon icon={faSeedling} className="teal" />
      </h1>
      <ErrorList errors={serverErrors} />
      <form onSubmit={onSubmit} className="callout primary">
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={userPayload.username}
              onChange={onInputChange}
              className="input-field"
            />
            <FormError error={errors.username} />
          </label>
        </div>
        <div>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={userPayload.email}
              onChange={onInputChange}
              className="input-field"
            />
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
              className="input-field"
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
              className="input-field"
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div className="button-group align-center">
          <input type="submit" className="button expanded" value="Join" />
          <p>
            Already a member?{" "}
            <Link to="/user-sessions/new" className="teal">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
