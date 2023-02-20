import axios from "axios";
import {
  GET_ALL_TODO,
  GET_ALL_COLLECTIONS,
  POST_COLLECTION,
  DELETE_COLLECTION,
  UPDATE_COLLECTION,
  POST_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  DONE_TODO,
} from "./url";
import {
  FETCH_COLLECTION_FAIL,
  FETCH_COLLECTION_START,
  FETCH_COLLECTION_SUCCESS,
  FETCH_TODO_START,
  FETCH_TODO_FAIL,
  FETCH_TODO_SUCCESS,
  POST_COLLECTION_START,
  POST_COLLECTION_SUCCESS,
  POST_COLLECTION_FAIL,
  REMOVE_TODO_ERROR,
  DELETE_COLLECTION_START,
  DELETE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_FAIL,
  DELETE_ALL_COLLECTION_FAIL,
  DELETE_ALL_COLLECTION_START,
  DELETE_ALL_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_START,
  UPDATE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_FAIL,
  POST_TODO_START,
  POST_TODO_SUCCESS,
  POST_TODO_FAIL,
  DELETE_TODO_START,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  DELETE_ALL_TODO_FAIL,
  DELETE_ALL_TODO_START,
  DELETE_ALL_TODO_SUCCESS,
  UPDATE_TODO_START,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAIL,
  BOOLEAN_TODO_FAIL,
  BOOLEAN_TODO_START,
  BOOLEAN_TODO_SUCCESS,
} from "./types";

import { authConfig } from "../config/config";
import { getCookie } from "../data/cookie";

//get todos for specific collection
export const getTodo = (userId, collection) => async (dispatch) => {
  dispatch({
    type: FETCH_TODO_START,
  });
  try {
    const res = await axios.get(`${GET_ALL_TODO}/${userId}/${collection}`, authConfig(getCookie("user")));

    dispatch({
      type: FETCH_TODO_SUCCESS,
      payload: res.data.todos,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TODO_FAIL,
      payload: error.response.data.error,
    });
  }
};

//get all the collections that the user have

export const getCollections = (userId) => async (dispatch) => {
  dispatch({
    type: FETCH_COLLECTION_START,
  });
  try {
    const res = await axios.get(`${GET_ALL_COLLECTIONS}/${userId}`, authConfig(getCookie("user")));
    dispatch({
      type: FETCH_COLLECTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COLLECTION_FAIL,

      payload: error.response.data.error,
    });
  }
};

//post new collection
export const postCollection =
  (userId, { collection, icon }) =>
  async (dispatch) => {
    dispatch({
      type: POST_COLLECTION_START,
    });
    try {
      const res = await axios.post(`${POST_COLLECTION}/${userId}`, { name: collection, icon: icon }, authConfig(getCookie("user")));

      dispatch({
        type: POST_COLLECTION_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_COLLECTION_FAIL,

        payload: error.response.data.error,
      });

      setTimeout(() => {
        dispatch({
          type: REMOVE_TODO_ERROR,
        });
      }, 3000);
    }
  };

//put  collection
export const updateCollection = (userId, collectionId, name, icon) => async (dispatch) => {
  dispatch({
    type: UPDATE_COLLECTION_START,
  });
  try {
    const res = await axios.put(
      `${UPDATE_COLLECTION}/${userId}/${collectionId}`,
      { name: name, icon: icon },
      authConfig(getCookie("user"))
    );

    dispatch({
      type: UPDATE_COLLECTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COLLECTION_FAIL,
      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_TODO_ERROR,
      });
    }, 3000);
  }
};

//put  collection favorite
export const favoriteCollection = (userId, collectionId) => async (dispatch) => {
  dispatch({
    type: UPDATE_COLLECTION_START,
  });
  try {
    const res = await axios.put(`${UPDATE_COLLECTION}/favorite/${userId}/${collectionId}`, authConfig(getCookie("user")));

    dispatch({
      type: UPDATE_COLLECTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COLLECTION_FAIL,
      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_TODO_ERROR,
      });
    }, 3000);
  }
};

//delete all  collection
export const deleteAllCollection = (userId) => async (dispatch) => {
  dispatch({
    type: DELETE_ALL_COLLECTION_START,
  });
  try {
    const res = await axios.delete(`${DELETE_COLLECTION}/all/${userId}`, authConfig(getCookie("user")));

    dispatch({
      type: DELETE_ALL_COLLECTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ALL_COLLECTION_FAIL,
      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_TODO_ERROR,
      });
    }, 3000);
  }
};

//delete  collection
export const deleteCollection = (userId, collectionId) => async (dispatch) => {
  dispatch({
    type: DELETE_COLLECTION_START,
  });
  try {
    const res = await axios.delete(`${DELETE_COLLECTION}/one/${userId}/${collectionId}`, authConfig(getCookie("user")));

    dispatch({
      type: DELETE_COLLECTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COLLECTION_FAIL,
      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_TODO_ERROR,
      });
    }, 3000);
  }
};

//post new todo
export const postTodo = (userId, collection_id, todoItem, icon) => async (dispatch) => {
  dispatch({
    type: POST_TODO_START,
  });

  try {
    const res = await axios.post(
      `${POST_TODO}/${userId}/${collection_id}`,
      { todoItem: todoItem, icon: icon },
      authConfig(getCookie("user"))
    );

    dispatch({
      type: POST_TODO_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_TODO_FAIL,

      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_TODO_ERROR,
      });
    }, 3000);
  }
};

//put  todo
export const updateTodo =
  (userId, collectionId, { todoItem, oldTodo, icon }) =>
  async (dispatch) => {
    dispatch({
      type: UPDATE_TODO_START,
    });
    try {
      const res = await axios.put(
        `${UPDATE_TODO}/${userId}/${collectionId}`,
        { todoItem: todoItem, oldTodo: oldTodo, icon: icon },
        authConfig(getCookie("user"))
      );

      dispatch({
        type: UPDATE_TODO_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_TODO_FAIL,
        payload: error.response.data.error,
      });

      setTimeout(() => {
        dispatch({
          type: REMOVE_TODO_ERROR,
        });
      }, 3000);
    }
  };

//put  todo done/undone
export const doneTodo = (userId, collectionId, todoId) => async (dispatch) => {
  dispatch({
    type: BOOLEAN_TODO_START,
  });
  try {
    const res = await axios.put(`${DONE_TODO}/${userId}/${collectionId}/${todoId}`, authConfig(getCookie("user")));

    dispatch({
      type: BOOLEAN_TODO_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOLEAN_TODO_FAIL,
      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_TODO_ERROR,
      });
    }, 3000);
  }
};

//delete  all todo
export const deleteAllTodo = (userId, collectionId) => async (dispatch) => {
  dispatch({
    type: DELETE_ALL_TODO_START,
  });
  try {
    const res = await axios.delete(`${DELETE_TODO}/all/${userId}/${collectionId}`, authConfig(getCookie("user")));

    dispatch({
      type: DELETE_ALL_TODO_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ALL_TODO_FAIL,
      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_TODO_ERROR,
      });
    }, 3000);
  }
};

//delete  todo
export const deleteTodo = (userId, collectionId, todoId) => async (dispatch) => {
  dispatch({
    type: DELETE_TODO_START,
  });
  try {
    const res = await axios.delete(`${DELETE_TODO}/one/${userId}/${collectionId}/${todoId}`, authConfig(getCookie("user")));

    dispatch({
      type: DELETE_TODO_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TODO_FAIL,
      payload: error.response.data.error,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_TODO_ERROR,
      });
    }, 3000);
  }
};
