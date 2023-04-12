import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../cookie';
import { isCookieAuthenticated, isCookieNull, isLogin } from './isLogined';


interface PrivateRouteProps {
  children ?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  authentication : boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반드시 안해야만 접속 가능
}


export default function PrivateRoute({authentication}:PrivateRouteProps):any{
  if(authentication) {
    // 인증이 반드시 필요한 페이지
    // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
    (!isLogin()||isCookieNull()|| isCookieAuthenticated())&&alert('Please use this function after logging in.\n해당 기능은 로그인 후 이용해주세요.');
    return (!isLogin()||isCookieNull()|| isCookieAuthenticated())?<Navigate to='/login'/>:<Outlet/>;
  } 
}

export function blockAccess():any{
    // 인증이 반드시 필요한 페이지
    // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
  (!isLogin()||isCookieNull())&&alert('Please use this function after logging in.\n해당 기능은 로그인 후 이용해주세요.');
  return (!isLogin()||isCookieNull())&&true;
}
