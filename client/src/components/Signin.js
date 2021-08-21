import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link, useHistory } from "react-router-dom";

const Signin = ({ isAuthenticated }) => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <h1>Sign In</h1>
      <div>
        or <Link to="/login">Log In</Link>
      </div>
      <br />
      <br />
    </>
  );
};

Signin.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Signin);
