import Footer from "../@components/@common/footer";
import backgroundImg from "../assets/image/backgroundImg.png";
import LoginModal from "../@components/login/loginModal";

export default function LoginPage() {
  return (
    <>
      <LoginModal />
      <img src={backgroundImg} />
      <Footer />
    </>
  );
}
