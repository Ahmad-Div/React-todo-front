import { getCookie } from "../data/cookie";

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const authConfig = {
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": getCookie("user"),
  },
};

export const fileAuthConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
    "x-auth-token": getCookie("user"),
  },
};
