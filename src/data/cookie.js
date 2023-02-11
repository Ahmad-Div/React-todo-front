import Cookies from "js-cookie";

const getCookie = (name) => {
  return Cookies.get(name);
};

const setCookie = (name, token) => {
  Cookies.set(name, token, {
    sameSite: "strict",
    path: "/",
    expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000),
  });
};

const removeCookie = (name) => {
  Cookies.remove(name);
};

export { getCookie, setCookie, removeCookie };
