import React from "react";

export const FormError = ({ error = "" }) => {
  if (error !== "") {
    return <span className="form-error is-visible">{error}</span>;
  }
  return null;
};
