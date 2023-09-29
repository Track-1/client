import Footer from "../@common/footer";

import styled from "styled-components";
import { SignupProfileCompleteTextIc, SignupProfileSkipIc } from "../../assets";
import background from "../../assets/icon/signupProfileBackgroundIc.svg";
import SignUpBackButton from "./signUpBackButton";

export default function SignupProfile() {
  return (
    <>
      <BackButtonWrapper>
        <SignUpBackButton />
      </BackButtonWrapper>
      <SignUpContainer>
        <Img src={background} alt="배경" />
        <SignupProfileSkipIcon />
        <UploadButton type="button">
          <SignupProfileCompleteTextIcon />
        </UploadButton>
        <StepBox></StepBox>
      </SignUpContainer>
      <Footer />
    </>
  );
}

const SignupProfileCompleteTextIcon = styled(SignupProfileCompleteTextIc)`
  width: 19.1062rem;
  height: 2.664rem;
`;

const UploadButton = styled.button`
  width: 35.2rem;
  height: 7rem;
  border-radius: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: 34rem 0 0 32rem;
  background-color: ${({ theme }) => theme.colors.gray3};

  cursor: pointer;
`;

const SignupProfileSkipIcon = styled(SignupProfileSkipIc)`
  width: 26.7rem;
  height: 6.5rem;
  margin: 15rem 0 0 48rem;
  position: absolute;

  cursor: pointer;
`;

const BackButtonWrapper = styled.div`
  margin: 5.9rem 0 0 7.9rem;
`;

const Img = styled.img`
  position: absolute;
  width: 192rem;
  height: 98rem;
`;

const SignUpContainer = styled.div`
  width: 192rem;
  height: 98rem;
`;

const StepBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  right: 18.1rem;

  width: 77.9rem;
  height: 88.8rem;

  margin-left: 10rem;

  backdrop-filter: blur(1rem);

  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);

  background-origin: border-box;
  background-clip: content-box, border-box;
`;
