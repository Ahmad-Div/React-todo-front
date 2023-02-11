import {
  DELETE_USER_START,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  REMOVE_USER_ERRORS,
} from "../../actions/types";

const initialState = {
  loading: false,
  errors: null,
};

export default function user(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DELETE_USER_START:
    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        errors: payload ? payload : null,
      };

    case DELETE_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        errors: null,
        loading: false,
      };

    case REMOVE_USER_ERRORS:
      return {
        ...state,
        errors: null,
      };

    default:
      return state;
  }
}
