import styled from "styled-components";
import subBackgroundImg from "../assets/image/subBackgroundImg.png";
import ForgotPasswordInput from "../@components/forgotPassword/forgotPasswordInput";
import BackButton from "../@components/@common/backButton";
import Footer from "../@components/@common/footer";

export default function ForgotPasswordPage() {
  return (
    <>
      <BackButtonWrapper>
        <BackButton />
      </BackButtonWrapper>
      <ForgotPasswordInput />
      <BackgroundImg src={subBackgroundImg} alt="배경사진" />
      <Footer />
    </>
  );
}

const BackButtonWrapper = styled.div`
  margin: 5.9rem 0 0 7.9rem;
`;

const BackgroundImg = styled.img`
  width: 192rem;
  margin-top: 19.6rem;
`;
