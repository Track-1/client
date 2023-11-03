import styled from "styled-components";
import Header from "../@common/header";
import BackgroundImg from "../../assets/image/backgroundImg.png";
import Footer from "../@common/footer";
import ResetPasswordInput from "./resetPasswordInput";
import { useTokenVerify } from "../../hooks/queries/user";
import HomeLogo from "../@common/homeLogo";

export default function ResetPasswordContainer() {
  const { tokenVerify } = useTokenVerify();

  return (
    <>
      {tokenVerify?.success ? (
        <>
          <Header>
            <HomeLogo />
          </Header>
          
          <MainContainer>
            <BackgroundImage src={BackgroundImg} alt="배경이미지" />
            <ResetPasswordInput />
          </MainContainer>
          <Footer />
        </>
      ) : (
        <div></div>
      )}
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
