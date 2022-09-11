import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Dashboard from "../pages/dashboard/dashboard";
import SignIn from "../pages/signin/signin";
import SignUp from "../pages/signup/signup";
import AuthRoute from "../components/AuthRoute/AuthRoute";
import { Provider } from "react-redux";
import store from '../redux/store'

export default function RouterDOM() {
  return (
    <Provider store={store}>
    <Router>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <AuthRoute exact path="/" component={SignIn} />
        <AuthRoute path="/signup" component={SignUp} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
    </Provider>
  );
}