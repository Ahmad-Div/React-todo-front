import { combineReducers } from "redux";
import auth from "./auth";
import todo from "./todo";
import user from "./user";
import plan from "./plan";
import chart from "./chart";
export default combineReducers({
  auth,
  todo,
  user,
  plan,
  chart,
});
