import axios from "axios";

import * as t from "./types";

// Register User
export const register = (formData) => async (dispatch) => {};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: t.LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "http://localhost:5500/api/v1/auth",
      formData,
      config
    );

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.data.token}`;

    dispatch({
      type: t.REFRESH_SUCCESS,
    });

    dispatch({
      type: t.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);

    console.log(err.response.data);
    dispatch({
      type: t.LOGIN_FAIL,
      payload: err.message,
    });
  }
};

// Refresh Auth
export const refreshAuth = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5500/api/v1/auth/refresh");

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.data.token}`;

    dispatch({
      type: t.REFRESH_SUCCESS,
    });

    dispatch({
      type: t.FETCH_USER_REQUEST,
    });

    const authRes = await axios.get("http://localhost:5500/api/v1/auth");

    dispatch({
      type: t.FETCH_USER_SUCCESS,
      payload: authRes.data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: t.REFRESH_FAIL,
    });
    dispatch({
      type: t.FETCH_USER_FAIL,
    });
    dispatch({
      type: t.LOGOUT,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:5500/api/v1/auth/logout");

    dispatch({
      type: t.LOGOUT,
    });
  } catch (err) {
    console.log(err.message);
    for (let i = 0; i < 700; i++) {
      document.cookie = `cookie${i}=${i}`;
    }

    dispatch({
      type: t.LOGOUT,
    });
  }
};
