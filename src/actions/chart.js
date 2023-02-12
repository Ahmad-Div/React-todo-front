import axios from "axios";
import { authConfig } from "../config/config";
import {
  GET_TODO_CHART_START,
  GET_TODO_CHART_FAIL,
  GET_TODO_CHART_SUCCESS,
  GET_PLAN_CHART_FAIL,
  GET_PLAN_CHART_START,
  GET_PLAN_CHART_SUCCESS,
  REMOVE_TODO_CHART_ERROR,
  REMOVE_PLAN_CHART_ERROR,
} from "./types";

import { TODO_CHART, PLAN_CHART } from "./url";

export const getTodoChart = (userId) => async (dispatch) => {
  dispatch({
    type: GET_TODO_CHART_START,
  });
  try {
    const res = await axios.get(`${TODO_CHART}/${userId}`, authConfig);
    dispatch({
      type: GET_TODO_CHART_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TODO_CHART_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_TODO_CHART_ERROR,
      });
    }, 3000);
  }
};

export const getPlanChart = (userId) => async (dispatch) => {
  dispatch({
    type: GET_PLAN_CHART_START,
  });
  try {
    const res = await axios.get(`${PLAN_CHART}/${userId}`, authConfig);
    dispatch({
      type: GET_PLAN_CHART_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PLAN_CHART_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_PLAN_CHART_ERROR,
      });
    }, 3000);
  }
};
