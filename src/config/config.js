import { getCookie } from "../data/cookie";
import dotenv from "dotenv";
dotenv.config();
export const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.REACT_HOST,
  },
};

export const authConfig = {
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": getCookie("user"),
    "Access-Control-Allow-Origin": process.env.REACT_HOST,
  },
};

export const fileAuthConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
    "x-auth-token": getCookie("user"),
    "Access-Control-Allow-Origin": process.env.REACT_HOST,
  },
};
