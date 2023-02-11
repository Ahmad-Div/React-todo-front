import {
  FETCH_PLAN_COLLECTION_FAIL,
  FETCH_PLAN_COLLECTION_START,
  FETCH_PLAN_COLLECTION_SUCCESS,
  FETCH_PLAN_FAIL,
  FETCH_PLAN_START,
  FETCH_PLAN_SUCCESS,
  POST_PLAN_COLLECTION_START,
  POST_PLAN_COLLECTION_FAIL,
  POST_PLAN_COLLECTION_SUCCESS,
  REMOVE_PLAN_ERROR,
  DELETE_PLAN_COLLECTION_FAIL,
  DELETE_PLAN_COLLECTION_START,
  DELETE_PLAN_COLLECTION_SUCCESS,
  UPDATE_PLAN_COLLECTION_START,
  UPDATE_PLAN_COLLECTION_FAIL,
  UPDATE_PLAN_COLLECTION_SUCCESS,
  POST_PLAN_START,
  POST_PLAN_FAIL,
  POST_PLAN_SUCCESS,
  DELETE_PLAN_FAIL,
  DELETE_PLAN_START,
  DELETE_PLAN_SUCCESS,
  UPDATE_PLAN_START,
  UPDATE_PLAN_FAIL,
  UPDATE_PLAN_SUCCESS,
  BOOLEAN_PLAN_FAIL,
  BOOLEAN_PLAN_START,
  BOOLEAN_PLAN_SUCCESS,
} from "../../actions/types";

const initialState = {
  planLoading: null,
  collectionLoading: null,
  plans: [],
  collections: [],
  planErrors: null,
  collectionErrors: null,
};
let index;
let array;

export default function plan(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //collections
    //fetch start
    case FETCH_PLAN_COLLECTION_START:
      return {
        ...state,
        collectionLoading: true,
      };
    //fetch fail
    case FETCH_PLAN_COLLECTION_FAIL:
      return {
        ...state,
        collections: [],
        collectionLoading: false,
        collectionErrors: payload ? payload : null,
      };
    //fetch success
    case FETCH_PLAN_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: payload,
        collectionLoading: false,
      };
    //CRUD start
    case POST_PLAN_COLLECTION_START:
    case UPDATE_PLAN_COLLECTION_START:
    case DELETE_PLAN_COLLECTION_START:
      return {
        ...state,
        collectionLoading: true,
      };
    //CRUD FAIL
    case POST_PLAN_COLLECTION_FAIL:
    case UPDATE_PLAN_COLLECTION_FAIL:
    case DELETE_PLAN_COLLECTION_FAIL:
      return {
        ...state,
        collectionErrors: payload ? payload : null,
        collectionLoading: false,
      };
    //CRUD success
    case POST_PLAN_COLLECTION_SUCCESS:
      return {
        ...state,
        collectionLoading: false,
        collectionErrors: null,
        collections: [...state.collections, payload],
      };

    case UPDATE_PLAN_COLLECTION_SUCCESS:
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

    case DELETE_PLAN_COLLECTION_SUCCESS:
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
    case FETCH_PLAN_START:
      return {
        ...state,
        planLoading: true,
      };
    //fetch fail
    case FETCH_PLAN_FAIL:
      return {
        ...state,
        plans: [],
        planLoading: false,
        planErrors: payload ? payload : null,
      };
    //fetch  success
    case FETCH_PLAN_SUCCESS:
      return {
        ...state,
        plans: payload,
        planLoading: false,
      };
    //CRUD start
    case POST_PLAN_START:
    case UPDATE_PLAN_START:
    case BOOLEAN_PLAN_START:
    case DELETE_PLAN_START:
      return {
        ...state,
        planLoading: true,
      };
    //CRUD fail
    case POST_PLAN_FAIL:
    case UPDATE_PLAN_FAIL:
    case BOOLEAN_PLAN_FAIL:
    case DELETE_PLAN_FAIL:
      return {
        ...state,
        planErrors: payload ? payload : null,
        planLoading: false,
      };
    //CRUD success
    //post success
    case POST_PLAN_SUCCESS:
      return {
        ...state,
        planLoading: false,
        planErrors: null,
        plans: [...state.plans, payload],
      };
    //update done success
    case UPDATE_PLAN_SUCCESS:
    case BOOLEAN_PLAN_SUCCESS:
      index = state.plans.findIndex((plan) => plan._id === payload._id);
      if (index !== -1) {
        state.plans.splice(index, 1, payload);
      }
      return {
        ...state,
        planLoading: false,
        planErrors: null,
        plans: state.plans,
      };
    //delete success
    case DELETE_PLAN_SUCCESS:
      index = state.plans.findIndex((plan) => plan._id === payload);
      if (index !== -1) {
        state.plans.splice(index, 1);
      }
      return {
        ...state,
        planErrors: null,
        planLoading: false,
        plans: state.plans,
      };
    //remove all redux errors
    case REMOVE_PLAN_ERROR:
      return {
        ...state,
        collectionErrors: null,
        planErrors: null,
      };
    default:
      return state;
  }
}
