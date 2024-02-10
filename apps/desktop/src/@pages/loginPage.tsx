import Layout from '../@components/@common/Layout';
import BackButton from '../@components/@common/backButton';
import ConventionModal from '../@components/@common/conventionModal';
import Header from '../@components/@common/header';
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
