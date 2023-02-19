import {
  DELETE_USER_START,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  UPDATE_USER_START,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  USER_DELETE,
  USER_UPDATE,
  REMOVE_ERRORS,
  REMOVE_USER_ERRORS,
} from "./types";
import { DELETE_USER, UPDATE_USER, UPLOAD_USER_IMAGE } from "./url";
import axios from "axios";
import setAuthToken from "../data/setAuthToken";
import { getCookie } from "../data/cookie";
import { authConfig, fileAuthConfig } from "../config/config";
//delete a user

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({
    type: DELETE_USER_START,
  });
  try {
    const res = await axios.delete(`${DELETE_USER}/${userId}`, authConfig);

    dispatch({
      type: DELETE_USER_SUCCESS,
    });

    //delete the user from auth reducer
    dispatch({
      type: USER_DELETE,
    });
    setAuthToken(getCookie("user"));
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_USER_ERRORS,
      });
    }, 3000);
  }
};

export const updateUser = (userId, body) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_START,
  });
  try {
    const res = await axios.put(`${UPDATE_USER}/${userId}`, body, authConfig);

    dispatch({
      type: UPDATE_USER_SUCCESS,
    });

    //update the user from auth reducer
    dispatch({
      type: USER_UPDATE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_USER_ERRORS,
      });
    }, 3000);
  }
};

export const updateNotificationUser = (userId) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_START,
  });
  try {
    const res = await axios.put(`${UPDATE_USER}/notification/${userId}`, authConfig);

    dispatch({
      type: UPDATE_USER_SUCCESS,
    });

    //update the user from auth reducer
    dispatch({
      type: USER_UPDATE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_USER_ERRORS,
      });
    }, 3000);
  }
};

export const uploadImage = (file, userId) => async (dispatch) => {
  try {
    const res = await axios.post(`${UPLOAD_USER_IMAGE}/${userId}`, file, fileAuthConfig);
    return res;
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_USER_ERRORS,
      });
    }, 3000);
  }
};
