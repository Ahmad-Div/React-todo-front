const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
const GET_TOKEN_URL = `${BACKEND_HOST}/api/user/jwt_token`;

const REGISTER_URL = `${BACKEND_HOST}/api/auth/`;
const LOGIN_URL = `${BACKEND_HOST}/api/auth/login`;

const GET_AUTH_TOKEN = `${BACKEND_HOST}/api/user/jwt_token`;
const GET_ALL_TODO = `${BACKEND_HOST}/api/todo/get/me`;
const GET_ALL_COLLECTIONS = `${BACKEND_HOST}/api/todo/get/me/collections`;

//todo
const POST_COLLECTION = `${BACKEND_HOST}/api/todo/collection`;
const DELETE_COLLECTION = `${BACKEND_HOST}/api/todo/collection`;
const UPDATE_COLLECTION = `${BACKEND_HOST}/api/todo/collection`;

const POST_TODO = `${BACKEND_HOST}/api/todo/todo`;
const DELETE_TODO = `${BACKEND_HOST}/api/todo/todo`;
const UPDATE_TODO = `${BACKEND_HOST}/api/todo/todo`;

const DONE_TODO = `${BACKEND_HOST}/api/todo/todo/done`;

//plan
const GET_ALL_PLAN = `${BACKEND_HOST}/api/plan/get/me`;
const GET_ALL_PLAN_COLLECTIONS = `${BACKEND_HOST}/api/plan/get/me/collections`;
const POST_PLAN_COLLECTION = `${BACKEND_HOST}/api/plan/collection`;
const DELETE_PLAN_COLLECTION = `${BACKEND_HOST}/api/plan/collection`;
const UPDATE_PLAN_COLLECTION = `${BACKEND_HOST}/api/plan/collection`;

const POST_PLAN = `${BACKEND_HOST}/api/plan/plan`;
const DELETE_PLAN = `${BACKEND_HOST}/api/plan/plan`;
const UPDATE_PLAN = `${BACKEND_HOST}/api/plan/plan`;

const DONE_PLAN = `${BACKEND_HOST}/api/plan/plan/done`;

//user
const DELETE_USER = `${BACKEND_HOST}/api/user`;
const UPDATE_USER = `${BACKEND_HOST}/api/user`;

const UPLOAD_USER_IMAGE = `${BACKEND_HOST}/api/upload/userImage`;

export {
  BACKEND_HOST,
  GET_ALL_COLLECTIONS,
  GET_TOKEN_URL,
  REGISTER_URL,
  GET_AUTH_TOKEN,
  LOGIN_URL,
  GET_ALL_TODO,
  POST_COLLECTION,
  DELETE_COLLECTION,
  UPDATE_COLLECTION,
  POST_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  DONE_TODO,
  DELETE_USER,
  UPDATE_USER,
  UPLOAD_USER_IMAGE,
  POST_PLAN_COLLECTION,
  DELETE_PLAN_COLLECTION,
  UPDATE_PLAN_COLLECTION,
  POST_PLAN,
  UPDATE_PLAN,
  DELETE_PLAN,
  GET_ALL_PLAN,
  GET_ALL_PLAN_COLLECTIONS,
  DONE_PLAN,
};
