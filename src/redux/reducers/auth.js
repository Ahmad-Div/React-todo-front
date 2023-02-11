import { getCookie, removeCookie, setCookie } from "../../data/cookie";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_START,
  USER_LOADED,
  AUTH_ERROR,
  REMOVE_ERRORS,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_DELETE,
  USER_UPDATE,
} from "../../actions/types";
const initialState = {
  token: getCookie("user"),
  isAuthenticated: null,
  isRegistered: false,
  loading: null,
  user: null,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_START:
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isRegistered: true,
        errors: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
        errors: null,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isRegistered: false,
        isAuthenticated: false,
        loading: false,
        errors: payload ? payload : null,
      };
    case REMOVE_ERRORS:
      return {
        ...state,
        errors: null,
      };

    //if the user deleted his account
    case USER_DELETE:
      return {
        token: removeCookie("user"),
        isAuthenticated: false,
        isRegistered: false,
        user: null,
        errors: null,
        loading: null,
      };

    case USER_UPDATE:
      return {
        ...state,
        user: payload,
      };

    //if user updated update his account
    default:
      return state;
  }
}
