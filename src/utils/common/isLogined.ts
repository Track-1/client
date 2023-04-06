import { getCookie } from "../cookie";

export function isLogin() {
    return getCookie("accessToken") !== undefined;
  }

export function checkIsNull(isAuthenticated:any){
    return isAuthenticated === null;
  }

export function checkIsAuthenticated(isAuthenticated:any){
    return isAuthenticated==='false'
  }
