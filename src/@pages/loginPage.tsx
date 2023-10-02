import Header from "../@components/@common/header";
import LoginForm from "../@components/login/loginForm";

export default function LoginPage() {
  return (
    <>
      <Header backBtn prevURL="/" />
      <LoginForm />
    </>
  );
}
