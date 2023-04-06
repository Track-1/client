import { getCookie } from "../cookie";

export function isLogin() {
    return getCookie("accessToken") !== undefined;
  }