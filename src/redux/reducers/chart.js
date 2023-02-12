import {
  GET_TODO_CHART_START,
  GET_TODO_CHART_FAIL,
  GET_TODO_CHART_SUCCESS,
  GET_PLAN_CHART_FAIL,
  GET_PLAN_CHART_START,
  GET_PLAN_CHART_SUCCESS,
  REMOVE_TODO_CHART_ERROR,
  REMOVE_PLAN_CHART_ERROR,
} from "../../actions/types";

const initialState = {
  todos: [],
  plans: [],
  todoLoading: false,
  planLoading: false,
  todoError: null,
  planError: null,
};

export default function chart(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TODO_CHART_START:
      return {
        ...state,
        todoLoading: true,
      };
    case GET_TODO_CHART_FAIL:
      return {
        ...state,
        todoLoading: false,
        todoError: payload,
      };
    case GET_TODO_CHART_SUCCESS:
      return {
        ...state,
        todoLoading: false,
        todos: payload,
      };

    case GET_PLAN_CHART_START:
      return {
        ...state,
        planLoading: true,
      };
    case GET_PLAN_CHART_FAIL:
      return {
        ...state,
        planLoading: false,
        planError: payload,
      };
    case GET_PLAN_CHART_SUCCESS:
      return {
        ...state,
        planLoading: false,
        plans: payload,
      };

    case REMOVE_PLAN_CHART_ERROR:
      return {
        ...state,
        planError: null,
      };
    case REMOVE_TODO_CHART_ERROR:
      return {
        ...state,
        todoError: null,
      };

    default:
      return state;
  }
}
