import { LOGIN_REQUEST, AUTH_REQUEST, LOGIN_SUCCESS, AUTH_SUCCESS, REFRESH_SUCCESS, LOGIN_FAIL, AUTH_FAIL, REFRESH_FAIL, LOGOUT } from '../types';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  toRefresh: true,
};

const tutorAuth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload.data.user,
        toRefresh: true,
      };
    case REFRESH_SUCCESS:
      return {
        ...state,
        toRefresh: true,
      };
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case REFRESH_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        toRefresh: false,
      };
    default:
      return state;
  }
};

export default tutorAuth;