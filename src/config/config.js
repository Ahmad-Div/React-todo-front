import { getCookie } from "../data/cookie";
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const authConfig = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
};

export const fileAuthConfig = (token) => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": token,
    },
  };
};
