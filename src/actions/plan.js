import axios from "axios";
import {
  POST_PLAN_COLLECTION,
  DELETE_PLAN_COLLECTION,
  UPDATE_PLAN_COLLECTION,
  POST_PLAN,
  UPDATE_PLAN,
  DELETE_PLAN,
  GET_ALL_PLAN,
  GET_ALL_PLAN_COLLECTIONS,
  DONE_PLAN,
} from "./url";
import {
  FETCH_PLAN_COLLECTION_FAIL,
  FETCH_PLAN_COLLECTION_START,
  FETCH_PLAN_COLLECTION_SUCCESS,
  FETCH_PLAN_START,
  FETCH_PLAN_FAIL,
  FETCH_PLAN_SUCCESS,
  POST_PLAN_COLLECTION_START,
  POST_PLAN_COLLECTION_SUCCESS,
  POST_PLAN_COLLECTION_FAIL,
  REMOVE_PLAN_ERROR,
  DELETE_PLAN_COLLECTION_START,
  DELETE_PLAN_COLLECTION_SUCCESS,
  DELETE_PLAN_COLLECTION_FAIL,
  UPDATE_PLAN_COLLECTION_START,
  UPDATE_PLAN_COLLECTION_SUCCESS,
  UPDATE_PLAN_COLLECTION_FAIL,
  POST_PLAN_START,
  POST_PLAN_SUCCESS,
  POST_PLAN_FAIL,
  DELETE_PLAN_START,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAIL,
  UPDATE_PLAN_START,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_FAIL,
  BOOLEAN_PLAN_FAIL,
  BOOLEAN_PLAN_START,
  BOOLEAN_PLAN_SUCCESS,
} from "./types";

import { authConfig } from "../config/config";
import { getCookie } from "../data/cookie";

//get todos for specific collection
export const getPlan = (userId, collection) => async (dispatch) => {
  dispatch({
    type: FETCH_PLAN_START,
  });
  try {
    const res = await axios.get(`${GET_ALL_PLAN}/${userId}/${collection}`, authConfig);

    dispatch({
      type: FETCH_PLAN_SUCCESS,
      payload: res.data.plans,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PLAN_FAIL,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_PLAN_ERROR,
      });
    }, 3000);
  }
};

//get all the collections that the user have

export const getPlanCollections = (userId) => async (dispatch) => {
  dispatch({
    type: FETCH_PLAN_COLLECTION_START,
  });
  try {
    const res = await axios.get(`${GET_ALL_PLAN_COLLECTIONS}/${userId}`, authConfig);
    dispatch({
      type: FETCH_PLAN_COLLECTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PLAN_COLLECTION_FAIL,

      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_PLAN_ERROR,
      });
    }, 3000);
  }
};

//post new collection
export const postPlanCollection = (userId, name) => async (dispatch) => {
  dispatch({
    type: POST_PLAN_COLLECTION_START,
  });
  try {
    const res = await axios.post(`${POST_PLAN_COLLECTION}/${userId}`, { name: name }, authConfig);

    dispatch({
      type: POST_PLAN_COLLECTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_PLAN_COLLECTION_FAIL,

      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_PLAN_ERROR,
      });
    }, 3000);
  }
};

//put  collection
export const updatePlanCollection = (userId, collectionId, name) => async (dispatch) => {
  dispatch({
    type: UPDATE_PLAN_COLLECTION_START,
  });
  try {
    const res = await axios.put(`${UPDATE_PLAN_COLLECTION}/${userId}/${collectionId}`, { name: name }, authConfig);

    dispatch({
      type: UPDATE_PLAN_COLLECTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PLAN_COLLECTION_FAIL,
      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_PLAN_ERROR,
      });
    }, 3000);
  }
};

//delete  collection
export const deletePlanCollection = (userId, collectionId) => async (dispatch) => {
  dispatch({
    type: DELETE_PLAN_COLLECTION_START,
  });
  try {
    const res = await axios.delete(`${DELETE_PLAN_COLLECTION}/${userId}/${collectionId}`, authConfig);

    dispatch({
      type: DELETE_PLAN_COLLECTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PLAN_COLLECTION_FAIL,
      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_PLAN_ERROR,
      });
    }, 3000);
  }
};

//post new todo
export const postPlan = (userId, collection_id, planItem) => async (dispatch) => {
  dispatch({
    type: POST_PLAN_START,
  });

  try {
    const res = await axios.post(`${POST_PLAN}/${userId}/${collection_id}`, { planItem: planItem }, authConfig);

    dispatch({
      type: POST_PLAN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_PLAN_FAIL,

      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_PLAN_ERROR,
      });
    }, 3000);
  }
};

//put  todo
export const updatePlan =
  (userId, collectionId, { planItem, oldPlan }) =>
  async (dispatch) => {
    dispatch({
      type: UPDATE_PLAN_START,
    });
    try {
      const res = await axios.put(`${UPDATE_PLAN}/${userId}/${collectionId}`, { planItem: planItem, oldPlan: oldPlan }, authConfig);

      dispatch({
        type: UPDATE_PLAN_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PLAN_FAIL,
        payload: error.response.data.error,
      });

      setTimeout(() => {
        dispatch({
          type: REMOVE_PLAN_ERROR,
        });
      }, 3000);
    }
  };

//put  todo done/undone
export const donePlan = (userId, collectionId, planId) => async (dispatch) => {
  dispatch({
    type: BOOLEAN_PLAN_START,
  });
  try {
    const res = await axios.put(`${DONE_PLAN}/${userId}/${collectionId}/${planId}`, authConfig);

    dispatch({
      type: BOOLEAN_PLAN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOLEAN_PLAN_FAIL,
      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_PLAN_ERROR,
      });
    }, 3000);
  }
};

//delete  todo
export const deletePlan = (userId, collectionId, planId) => async (dispatch) => {
  dispatch({
    type: DELETE_PLAN_START,
  });
  try {
    const res = await axios.delete(`${DELETE_PLAN}/${userId}/${collectionId}/${planId}`, authConfig);

    dispatch({
      type: DELETE_PLAN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PLAN_FAIL,
      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_PLAN_ERROR,
      });
    }, 3000);
  }
};
