import Footer from "../@components/@common/footer";
import backgroundImg from "../assets/image/backgroundImg.png";
import LoginInput from "../@components/login/loginInput";
import BackButton from '../@components/@common/backButton';
import styled from "styled-components";

export default function LoginPage() {
  return (
    <>
    <BackButtonWrapper>
      <BackButton/>
    </BackButtonWrapper>
    
      <LoginInput />
      <BackgroundImg src={backgroundImg} alt="배경사진" />
      <Footer />
    </>
  );
}

const BackButtonWrapper=styled.div`
  margin:5.9rem 0 0 7.9rem;
`

const BackgroundImg=styled.img`
  margin-top: 19.6rem;
  width: 192rem;
`
