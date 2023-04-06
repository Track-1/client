import { getCookie } from "../cookie";

export function isLogin() {
    return getCookie("accessToken") !== undefined;
  }

export function checkIsNull(isAuthenticated:string){
    return isAuthenticated === null;
}

export function checkIsAuthenticated(isAuthenticated:string){
    return isAuthenticated==='false'
}
