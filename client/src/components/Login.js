import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link, useHistory } from "react-router-dom";

import { login } from "./../actions/auth";

const Login = ({ isAuthenticated, login }) => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();

    // Login
    login(formData);

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <h1>Log In</h1>
      <div>
        or <Link to="/signin">Sign In</Link>
      </div>
      <br />
      <br />

      <form onSubmit={(e) => onSubmitLogin(e)}>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => onChangeValue(e)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChangeValue(e)}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
