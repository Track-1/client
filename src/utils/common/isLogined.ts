import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../cookie";

export function isLogin() {
    return getCookie("accessToken") !== undefined;
  }

export function isCookieNull(){
    return getCookie("accessToken") === null;
}

export function isCookieAuthenticated(){
    return getCookie("accessToken")==='false'
}

