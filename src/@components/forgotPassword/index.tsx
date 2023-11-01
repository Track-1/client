import styled from "styled-components";
import BackgroundImg from "../../assets/image/backgroundImg.png";
import BackButton from "../@common/backButton";
import Footer from "../@common/footer";
import Header from "../@common/header";
import ForgotPasswordInput from "./forgotPasswordInput";

export default function ForgotPasswordContainer() {
  return (
    <>
      <Header>
        <BackButton staticPrevURL={"/login"} />
      </Header>
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
