import Layout from '../@components/@common/layout/layout';
import BackButton from '../@components/@common/button/backButton';
import ConventionModal from '../@components/@common/modal/conventionModal';
import Header from '../@components/@common/layout/header';
import LoginForm from '../@components/login/loginForm';
import useConventionModal from '../hooks/common/useConventionModal';
import { checkIsCookieNull, checkIsLogin } from '../utils/common/checkIsLogined';

export default function LoginPage() {
  const { conventionModalInform } = useConventionModal();

  const staticPrevURL = !checkIsLogin() || checkIsCookieNull() === true ? '/' : undefined;

  return (
    <Layout>
      {conventionModalInform?.isOpen && <ConventionModal />}
      <Header>
        <BackButton staticPrevURL={staticPrevURL} />
      </Header>

      <LoginForm />
    </Layout>
  );
}
