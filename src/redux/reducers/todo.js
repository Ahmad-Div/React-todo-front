import {
  FETCH_COLLECTION_FAIL,
  FETCH_COLLECTION_START,
  FETCH_COLLECTION_SUCCESS,
  FETCH_TODO_FAIL,
  FETCH_TODO_START,
  FETCH_TODO_SUCCESS,
  POST_COLLECTION_START,
  POST_COLLECTION_FAIL,
  POST_COLLECTION_SUCCESS,
  REMOVE_TODO_ERROR,
  DELETE_COLLECTION_FAIL,
  DELETE_COLLECTION_START,
  DELETE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_START,
  UPDATE_COLLECTION_FAIL,
  UPDATE_COLLECTION_SUCCESS,
  POST_TODO_START,
  POST_TODO_FAIL,
  POST_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  DELETE_TODO_START,
  DELETE_TODO_SUCCESS,
  UPDATE_TODO_START,
  UPDATE_TODO_FAIL,
  UPDATE_TODO_SUCCESS,
  BOOLEAN_TODO_FAIL,
  BOOLEAN_TODO_START,
  BOOLEAN_TODO_SUCCESS,
} from "../../actions/types";

const initialState = {
  todoLoading: null,
  collectionLoading: null,
  todos: [],
  collections: [],
  todoErrors: null,
  collectionErrors: null,
};
let index;
let array;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //collections
    //fetch start
    case FETCH_COLLECTION_START:
      return {
        ...state,
        collectionLoading: true,
      };
    //fetch fail
    case FETCH_COLLECTION_FAIL:
      return {
        ...state,
        collections: [],
        collectionLoading: false,
        collectionErrors: payload ? payload : null,
      };
    //fetch success
    case FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: payload,
        collectionLoading: false,
      };
    //CRUD start
    case POST_COLLECTION_START:
    case UPDATE_COLLECTION_START:
    case DELETE_COLLECTION_START:
      return {
        ...state,
        collectionLoading: true,
      };
    //CRUD FAIL
    case POST_COLLECTION_FAIL:
    case UPDATE_COLLECTION_FAIL:
    case DELETE_COLLECTION_FAIL:
      return {
        ...state,
        collectionErrors: payload ? payload : null,
        collectionLoading: false,
      };
    //CRUD success
    case POST_COLLECTION_SUCCESS:
      return {
        ...state,
        collectionLoading: false,
        collectionErrors: null,
        collections: [...state.collections, payload],
      };

    case UPDATE_COLLECTION_SUCCESS:
      index = state.collections.findIndex((collection) => collection._id === payload._id);
      if (index !== -1) {
        state.collections.splice(index, 1, payload);
      }
      return {
        ...state,
        collectionLoading: false,
        collectionErrors: null,
        collections: state.collections,
      };

    case DELETE_COLLECTION_SUCCESS:
      index = state.collections.findIndex((collection) => collection._id === payload);
      if (index !== -1) {
        state.collections.splice(index, 1);
      }

      return {
        ...state,
        collectionErrors: null,
        collectionLoading: false,
        collections: state.collections,
      };

    //todo
    //fetch start
    case FETCH_TODO_START:
      return {
        ...state,
        todoLoading: true,
      };
    //fetch fail
    case FETCH_TODO_FAIL:
      return {
        ...state,
        todos: [],
        todoLoading: false,
        todoErrors: payload ? payload : null,
      };
    //fetch  success
    case FETCH_TODO_SUCCESS:
      return {
        ...state,
        todos: payload,
        todoLoading: false,
      };
    //CRUD start
    case POST_TODO_START:
    case UPDATE_TODO_START:
    case BOOLEAN_TODO_START:
    case DELETE_TODO_START:
      return {
        ...state,
        todoLoading: true,
      };
    //CRUD fail
    case POST_TODO_FAIL:
    case UPDATE_TODO_FAIL:
    case BOOLEAN_TODO_FAIL:
    case DELETE_TODO_FAIL:
      return {
        ...state,
        todoErrors: payload ? payload : null,
        todoLoading: false,
      };
    //CRUD success
    //post success
    case POST_TODO_SUCCESS:
      state.todos = state.todos.sort((a, b) => {
        return a.done - b.done;
      });
      return {
        ...state,
        todoLoading: false,
        todoErrors: null,
        todos: [payload, ...state.todos],
      };
    //update done success
    case UPDATE_TODO_SUCCESS:
    case BOOLEAN_TODO_SUCCESS:
      index = state.todos.findIndex((todo) => todo._id === payload._id);
      if (index !== -1) {
        state.todos.splice(index, 1, payload);
      }
      state.todos = state.todos.sort((a, b) => {
        return a.done - b.done;
      });
      return {
        ...state,
        todoLoading: false,
        todoErrors: null,
        todos: state.todos,
      };
    //delete success
    case DELETE_TODO_SUCCESS:
      index = state.todos.findIndex((todo) => todo._id === payload);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
      state.todos = state.todos.sort((a, b) => {
        return a.done - b.done;
      });
      return {
        ...state,
        todoErrors: null,
        todoLoading: false,
        todos: state.todos,
      };
    //remove all redux errors
    case REMOVE_TODO_ERROR:
      return {
        ...state,
        collectionErrors: null,
        todoErrors: null,
      };
    default:
      return state;
  }
}
