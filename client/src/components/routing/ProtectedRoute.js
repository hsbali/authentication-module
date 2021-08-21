import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  ...rest
}) => {
  const getCookieValue = (name) => {
    let result = document.cookie.match(
      "(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return result ? result.pop() : "";
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        getCookieValue("___authenticated") !== "true" ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(PrivateRoute);
