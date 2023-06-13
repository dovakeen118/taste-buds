import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { signInFormValidation } from "../../services/validations/signInFormValidation";

import { FormError } from "../layout/FormError";
import { postUserSession } from "../../services/requests/postUserSession";

export const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ username: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const [credentialsErrors, setCredentialsErrors] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (signInFormValidation({ userPayload, setErrors })) {
      try {
        const { user } = await postUserSession({ userPayload, setCredentialsErrors });
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
    location.href = "/profile";
  }

  return (
    <div className="passport-form">
      <h1 className="text-center">
        Welcome back <FontAwesomeIcon icon={faHeart} className="pink" />
      </h1>

      {credentialsErrors ? <p className="callout alert">{credentialsErrors}</p> : null}

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
        <div className="button-group align-center">
          <input type="submit" className="button expanded" value="Sign In" />
          <p>
            Want to join?{" "}
            <Link to="/users/new" className="teal">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
