import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAIL, LOGIN_REQUEST, AUTH_REQUEST, LOGIN_SUCCESS, AUTH_SUCCESS, REFRESH_SUCCESS, LOGIN_FAIL, AUTH_FAIL, REFRESH_FAIL, LOGOUT } from "../types";
import { request, setAuthTokenToAxios } from "../../utils/httpRequest";
import { getApiBaseUrl } from "../../utils/getBaseUrlByEnv";
import { setAlert } from "../actions/alert.action";

export const signin = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: SIGNIN_REQUEST,
    });

    const res = await request(
      "POST",
      `${getApiBaseUrl()}/api/users`,
      formData
    );

    setAuthTokenToAxios(res.data.data.token);

    dispatch({
      type: REFRESH_SUCCESS,
    });

    dispatch({
      type: SIGNIN_SUCCESS,
    });
    return true;
  } catch (err) {
    console.log(err);
    dispatch({
      type: SIGNIN_FAIL,
    });
    if (err.response) dispatch(setAlert(err.response.data.message, "error"))
    throw err;
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const res = await request(
      "POST",
      `${getApiBaseUrl()}/api/auth`,
      formData
    );

    setAuthTokenToAxios(res.data.data.token);

    dispatch({
      type: REFRESH_SUCCESS,
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
    });
    if (err.response) dispatch(setAlert(err.response.data.message, "error"))
    throw err;
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_REQUEST,
    });

    const res = await request(
      "GET",
      `${getApiBaseUrl()}/api/auth`
    );

    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_FAIL,
    });
    throw err;
  }
};

// Refresh Auth
export const refreshAuth = () => async (dispatch) => {
  try {
    const res = await request(
      "GET",
      `${getApiBaseUrl()}/api/auth/refresh`
    );

    setAuthTokenToAxios(res.data.data.token);

    dispatch({
      type: REFRESH_SUCCESS,
    });
    return true;
  } catch (err) {
    console.log(err);
    dispatch({
      type: REFRESH_FAIL,
    });
    throw err;
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    await request(
      "GET",
      `${getApiBaseUrl()}/api/auth/logout`
    );

    dispatch({
      type: LOGOUT,
    });
    return true;
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: LOGOUT,
    });
    return true;
  }
};
