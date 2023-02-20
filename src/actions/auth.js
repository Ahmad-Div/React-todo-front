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
  AUTH_EMAIL_START,
  AUTH_EMAIL_SUCCESS,
  AUTH_EMAIL_FAIL,
} from "./types";
import {
  GET_AUTH_TOKEN,
  LOGIN_URL,
  REGISTER_URL,
  AUTH_EMAIL_URL,
  SEND_CODE_URL,
  RE_EMAIL_URL,
  AUTH_EMAIL_FORGET_PASSWORD_URL,
  RE_EMAIL_FORGET_PASSWORD_URL,
  SEND_CODE_FORGET_PASSWORD_URL,
  CHANGE_PASSWORD_URL,
} from "./url";
import { config } from "../config/config";
import { getCookie, removeCookie, setCookie } from "../data/cookie";
import setAuthToken from "../data/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (!getCookie("user")) return;
  setAuthToken(getCookie("user"));

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
    setAuthToken(null);
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
  ({ email, password, navigate }) =>
  async (dispatch) => {
    dispatch({
      type: LOGIN_START,
    });

    const body = { email, password };

    try {
      const res = await axios.post(LOGIN_URL, body, config);

      if (!res.data.data.isAuthenticated) {
        //to remove the loading state
        dispatch({
          type: REMOVE_ERRORS,
        });
        navigate("/auth/authenticate");
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        setCookie("user", res.data.token);
        setAuthToken(res.data.token);
        dispatch(loadUser());
      }
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

export const authEmail = (input, navigate) => async (dispatch) => {
  dispatch({
    type: AUTH_EMAIL_START,
  });

  try {
    const res = await axios.post(AUTH_EMAIL_URL, { email: input }, config);

    dispatch({
      type: AUTH_EMAIL_SUCCESS,
      payload: res.data,
    });
    navigate("/auth/authenticate/code");
  } catch (error) {
    dispatch({
      type: AUTH_EMAIL_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ERRORS,
      });
    }, 3000);
  }
};
export const reEmail = (input, navigate) => async (dispatch) => {
  dispatch({
    type: AUTH_EMAIL_START,
  });

  try {
    const res = await axios.post(RE_EMAIL_URL, config);

    dispatch({
      type: AUTH_EMAIL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_EMAIL_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ERRORS,
      });
    }, 3000);
  }
};

export const sendCode = (input, navigate) => async (dispatch) => {
  dispatch({
    type: AUTH_EMAIL_START,
  });

  try {
    const res = await axios.post(SEND_CODE_URL, { code: input }, config);

    dispatch({
      type: AUTH_EMAIL_SUCCESS,
      payload: res.data,
    });
    navigate("/auth/login");
  } catch (error) {
    dispatch({
      type: AUTH_EMAIL_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ERRORS,
      });
    }, 3000);
  }
};

export const forgetPassword = (input, navigate) => async (dispatch) => {
  dispatch({
    type: AUTH_EMAIL_START,
  });

  try {
    const res = await axios.post(AUTH_EMAIL_FORGET_PASSWORD_URL, { email: input }, config);

    dispatch({
      type: AUTH_EMAIL_SUCCESS,
      payload: res.data,
    });
    navigate("/auth/password/code");
  } catch (error) {
    dispatch({
      type: AUTH_EMAIL_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ERRORS,
      });
    }, 3000);
  }
};

export const rePasswordEmail = (input, navigate) => async (dispatch) => {
  dispatch({
    type: AUTH_EMAIL_START,
  });

  try {
    const res = await axios.post(RE_EMAIL_FORGET_PASSWORD_URL, config);

    dispatch({
      type: AUTH_EMAIL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_EMAIL_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ERRORS,
      });
    }, 3000);
  }
};

export const sendCodePassword = (input, navigate) => async (dispatch) => {
  dispatch({
    type: AUTH_EMAIL_START,
  });

  try {
    const res = await axios.post(SEND_CODE_FORGET_PASSWORD_URL, { code: input }, config);

    dispatch({
      type: AUTH_EMAIL_SUCCESS,
      payload: res.data,
    });
    navigate("/auth/password/change");
  } catch (error) {
    dispatch({
      type: AUTH_EMAIL_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ERRORS,
      });
    }, 3000);
  }
};

export const changePassword = (input, navigate) => async (dispatch) => {
  dispatch({
    type: AUTH_EMAIL_START,
  });

  try {
    const res = await axios.post(CHANGE_PASSWORD_URL, { password: input }, config);

    dispatch({
      type: AUTH_EMAIL_SUCCESS,
      payload: res.data,
    });
    navigate("/auth/login");
  } catch (error) {
    dispatch({
      type: AUTH_EMAIL_FAIL,
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
