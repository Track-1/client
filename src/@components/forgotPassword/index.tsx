import styled from "styled-components";
import ForgotPasswordInput from "./forgotPasswordInput";
import BackgroundImg from "../../assets/image/backgroundImg.png";
import Header from "../@common/header";
import Footer from "../@common/footer";

export default function ForgotPasswordContainer() {
  return (
    <>
      <Header backBtn prevURL="/login" />
      <MainContainer>
        <BackgroundImage src={BackgroundImg} alt="배경이미지" />
        <ForgotPasswordInput />
      </MainContainer>
      <Footer />
    </>
  );
}

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
`;

const BackgroundImage = styled.img`
  margin-top: 22.2rem;
`;
