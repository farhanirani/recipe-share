import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// pages for this product
import HomePage from "./views/Homepage/HomePage";
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/Authentication/LoginPage";
import SignUpPage from "./views/Authentication/SignUpPage";
import CreateRecipe from "./views/CreateRecipe/CreateRecipe";
import ViewRecipe from "./views/ViewRecipe";

export default function App() {
  const ttt = localStorage.getItem("auth-token");

  useEffect(() => {
    if (ttt === null) {
      localStorage.setItem("auth-token", "");
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/create" component={CreateRecipe} />
        <Route path="/view" component={ViewRecipe} />
      </Switch>
    </BrowserRouter>
  );
}
