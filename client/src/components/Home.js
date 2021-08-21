import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import { logout } from "../actions/auth";

const Home = ({ user, logout }) => {
  const history = useHistory();

  if (user === null) {
    return (
      <>
        <div>Loading</div>
      </>
    );
  }

  return (
    <>
      <h1>Welcome, {user.full_name}</h1>

      <button onClick={() => logout()}>Log out</button>
    </>
  );
};

Home.propTypes = {
  // isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  // isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Home);
