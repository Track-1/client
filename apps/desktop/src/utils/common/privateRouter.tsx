import { ReactElement } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { checkIsCookieAuthenticated, checkIsCookieNull, checkIsLogin } from "./checkIsLogined";

interface PrivateRouteProps {
  children?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  authentication: boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반드시 안해야만 접속 가능
}

export default function PrivateRoute({ authentication }: PrivateRouteProps): any {
  const prevURL = useLocation().state?.prevURL;
  const navigate = useNavigate();
  if (authentication) {
    // 인증이 반드시 필요한 페이지
    // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
    if (!checkIsLogin() || checkIsCookieNull() || checkIsCookieAuthenticated()) {
      alert("Please use this function after logging in.\n해당 기능은 로그인 후 이용해주세요.");
      navigate("/login", {
        state: {
          prevURL: prevURL,
        },
      });
      return <Navigate to="/login" />;
    } else {
      return <Outlet />;
    }
  }
}

export function blockAccess(): any {
  // 인증이 반드시 필요한 페이지
  // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
  (!checkIsLogin() || checkIsCookieNull()) &&
    alert("Please use this function after logging in.\n해당 기능은 로그인 후 이용해주세요.");
  return (!checkIsLogin() || checkIsCookieNull()) && true;
}
