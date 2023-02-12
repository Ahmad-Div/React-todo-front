import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_START,
  USER_LOADED,
  AUTH_ERROR,
  REMOVE_ERRORS,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import { GET_AUTH_TOKEN, LOGIN_URL, REGISTER_URL } from "./url";
import { config } from "../config/config";
import { getCookie, removeCookie, setCookie } from "../data/cookie";
import setAuthToken from "../data/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (getCookie("user")) {
    setAuthToken(getCookie("user"));
  }

  try {
    const res = await axios.get(GET_AUTH_TOKEN);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
    removeCookie("user");
    setAuthToken(getCookie("user"));
  }
};

export const register =
  ({ name, username, email, password }) =>
  async (dispatch) => {
    dispatch({
      type: REGISTER_START,
    });

    const body = { name, username, email, password };

    try {
      const res = await axios.post(REGISTER_URL, body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.error,
      });
      setTimeout(() => {
        dispatch({
          type: REMOVE_ERRORS,
        });
      }, 3000);
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({
      type: LOGIN_START,
    });

    const body = { email, password };

    try {
      const res = await axios.post(LOGIN_URL, body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      setCookie("user", res.data.token);
      setAuthToken(res.data.token);
      dispatch(loadUser());
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.error,
      });
      setTimeout(() => {
        dispatch({
          type: REMOVE_ERRORS,
        });
      }, 3000);
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  removeCookie("user");
  setAuthToken(getCookie("user"));
};
