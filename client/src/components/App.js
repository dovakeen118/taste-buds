import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";

import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import RecipeDetails from "./recipes/RecipeDetails";
import RecipeForm from "./recipes/RecipeForm";
import RecipeList from "./recipes/RecipeList";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";

import "../assets/scss/main.scss";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <div className="grid-container">
        <Switch>
          <Route exact path="/" component={RecipeList} />
          <AuthenticatedRoute exact path="/recipes/new" component={RecipeForm} user={currentUser} />
          <Route exact path="/recipes/:id" component={RecipeDetails} />
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default hot(App);
