import BackButton from "../@components/@common/backButton";
import ConventionModal from "../@components/@common/conventionModal";
import Header from "../@components/@common/header";
import LoginForm from "../@components/login/loginForm";
import useConventionModal from "../hooks/common/useConventionModal";

export default function LoginPage() {
  const { conventionModalInform } = useConventionModal();

  return (
    <>
      {conventionModalInform?.isOpen && <ConventionModal />}
      <Header>
        <BackButton />
      </Header>

      <LoginForm />
    </>
  );
}
