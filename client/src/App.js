import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/routing/ProtectedRoute";

import axios from "axios";

import Home from "./components/Home";
import Login from "./components/Login";
import Signin from "./components/Signin";

import { refreshAuth } from "./actions/auth";

const App = ({ refreshAuth, toRefresh }) => {
  useEffect(() => {
    axios.defaults.withCredentials = true;

    refreshAuth();

    const refresher = setInterval(function () {
      if (toRefresh) {
        refreshAuth();
      }
    }, 18 * 60 * 1000);

    return () => {
      clearInterval(refresher);
    };
  }, []);

  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signin" component={Signin} />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  refreshAuth: PropTypes.func.isRequired,
  toRefresh: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  toRefresh: state.auth.toRefresh,
});

export default connect(mapStateToProps, { refreshAuth })(App);
