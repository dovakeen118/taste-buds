import React from "react";
import { Redirect, Route } from "react-router";

const AuthenticationCheck = ({ component: Component, user }) => {
  if (user === undefined) {
    return <div>Loading...</div>;
  }
  if (user !== null) {
    return <Component user={user} />;
  }
  return <Redirect to="/user-sessions/new" />;
};

export const AuthenticatedRoute = ({ component, user, ...rest }) => {
  return (
    <Route {...rest}>
      <AuthenticationCheck user={user} component={component} />
    </Route>
  );
};
