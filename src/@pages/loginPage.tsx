import Footer from "../@components/@common/footer";
import backgroundImg from "../assets/image/backgroundImg.png";
import LoginInput from "../@components/login/loginInput";

export default function LoginPage() {
  return (
    <>
      <LoginInput />
      <img src={backgroundImg} alt="배경사진" />
      {/* <Footer /> */}
    </>
  );
}
