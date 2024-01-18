import { ReactElement } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { checkIsLogin, isLoggedIn } from './check';

interface PrivateRouteProps {
  children?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  authentication: boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반드시 안해야만 접속 가능
}

export default function PrivateRoute({ authentication }: PrivateRouteProps): any {
  if (authentication) {
    if (!checkIsLogin()) {
      alert('Please use this function after logging in.\n해당 기능은 로그인 후 이용해주세요.');
      return <Navigate to="/" />;
    } else {
      return <Outlet />;
    }
  }
}
