import { PropsWithChildren, useEffect } from 'react';
import { getCookie } from '../../../utils/common/cookie';
import { useResetRecoilState } from 'recoil';
import { loginUserData } from '../../../recoil/common/loginUserData';

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  const resetLoginUserData = useResetRecoilState(loginUserData);

  useEffect(() => {
    if (!getCookie('accessToken')) {
      resetLoginUserData();
    }
  }, []);

  return <>{children}</>;
}
