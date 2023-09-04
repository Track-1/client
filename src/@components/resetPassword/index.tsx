import styled from "styled-components";
import Header from "../@common/header";
import BackgroundImg from "../../assets/image/backgroundImg.png";
import Footer from "../@common/footer";
import ResetPasswordInput from "./resetPasswordInput";

export default function ResetPasswordContainer() {
  return (
    <>
      <Header homeLogo />
      <MainContainer>
        <BackgroundImage src={BackgroundImg} alt="배경이미지" />
        <ResetPasswordInput />
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
