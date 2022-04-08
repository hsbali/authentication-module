import axios from 'axios';
import store from "./../store";
import { AUTH_FAIL } from "./../store/types";

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    store.dispatch({
      type: AUTH_FAIL
    });
  }
  throw error;
});

export const request = async (method, url, body={}, options={}) => {
  let request;

  switch (method) {
    case 'GET':
      request = await axios.get(url);
      break;
    case 'POST':
      request = await axios.post(url, body, options);
      break;
    case 'PUT':
      request = await axios.put(url, body);
      break;
    case 'DELETE':
      request = await axios.delete(url, { data: body });
      break;
    case 'PATCH':
      request = await axios.patch(url, body);
      break;
    default:
      break;
  }

  return request;
};

export const setAuthTokenToAxios = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const setAxiosWithCredentials = () => {
  if (!axios.defaults.withCredentials) {
    axios.defaults.withCredentials = true;
  }
}