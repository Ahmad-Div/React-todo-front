import { getCookie } from "../data/cookie";
import dotenv from "dotenv";
dotenv.config();
export const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://kurd-todo.netlify.app",
  },
};

export const authConfig = {
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": getCookie("user"),
    "Access-Control-Allow-Origin": "https://kurd-todo.netlify.app",
  },
};

export const fileAuthConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
    "x-auth-token": getCookie("user"),
    "Access-Control-Allow-Origin": "https://kurd-todo.netlify.app",
  },
};
