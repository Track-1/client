import { useRecoilValue } from 'recoil';
import Admin from '../@components/admin';
import { ROLE } from '../core/common/roleType';
import ErrorPage from './errorPage';
import { loginUserData } from '../recoil/common/loginUserData';
import Layout from '../@components/@common/Layout';

export default function AdminPage() {
  const userId = useRecoilValue(loginUserData).userId;
  const userType = useRecoilValue(loginUserData).userType;

  function checkAdmin() {
    if (userType === ROLE.PRODUCER) {
      return userId === 8;
    } else {
      return userId === 6;
    }
  }

  return <Layout>{checkAdmin() ? <Admin /> : <ErrorPage />}</Layout>;
}
