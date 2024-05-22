import { getCookie } from "./cookie";

export function checkIsLogin() {
  return getCookie("accessToken") !== undefined;
}

export function checkIsCookieNull() {
  return getCookie("accessToken") === null;
}

export function checkIsCookieAuthenticated() {
  return getCookie("accessToken") === "false";
}
