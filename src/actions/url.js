export const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
export const GET_TOKEN_URL = `${BACKEND_HOST}/api/user/jwt_token`;

export const REGISTER_URL = `${BACKEND_HOST}/api/auth/`;
export const LOGIN_URL = `${BACKEND_HOST}/api/auth/login`;

export const GET_AUTH_TOKEN = `${BACKEND_HOST}/api/user/jwt_token`;
export const GET_ALL_TODO = `${BACKEND_HOST}/api/todo/get/me`;
export const GET_ALL_COLLECTIONS = `${BACKEND_HOST}/api/todo/get/me/collections`;

//todo
export const POST_COLLECTION = `${BACKEND_HOST}/api/todo/collection`;
export const DELETE_COLLECTION = `${BACKEND_HOST}/api/todo/collection`;
export const UPDATE_COLLECTION = `${BACKEND_HOST}/api/todo/collection`;

export const POST_TODO = `${BACKEND_HOST}/api/todo/todo`;
export const DELETE_TODO = `${BACKEND_HOST}/api/todo/todo`;
export const UPDATE_TODO = `${BACKEND_HOST}/api/todo/todo`;

export const DONE_TODO = `${BACKEND_HOST}/api/todo/todo/done`;

//plan
export const GET_ALL_PLAN = `${BACKEND_HOST}/api/plan/get/me`;
export const GET_ALL_PLAN_COLLECTIONS = `${BACKEND_HOST}/api/plan/get/me/collections`;
export const POST_PLAN_COLLECTION = `${BACKEND_HOST}/api/plan/collection`;
export const DELETE_PLAN_COLLECTION = `${BACKEND_HOST}/api/plan/collection`;
export const UPDATE_PLAN_COLLECTION = `${BACKEND_HOST}/api/plan/collection`;

export const POST_PLAN = `${BACKEND_HOST}/api/plan/plan`;
export const DELETE_PLAN = `${BACKEND_HOST}/api/plan/plan`;
export const UPDATE_PLAN = `${BACKEND_HOST}/api/plan/plan`;

export const DONE_PLAN = `${BACKEND_HOST}/api/plan/plan/done`;

//user
export const DELETE_USER = `${BACKEND_HOST}/api/user`;
export const UPDATE_USER = `${BACKEND_HOST}/api/user`;

export const UPLOAD_USER_IMAGE = `${BACKEND_HOST}/api/upload/userImage`;

//chart

export const TODO_CHART = `${BACKEND_HOST}/api/result/todo`;
export const PLAN_CHART = `${BACKEND_HOST}/api/result/plan`;
