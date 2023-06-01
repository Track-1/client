import { useState } from "react";
import styled from "styled-components";
import StepFooter from "../@components/signUp/stepFooter";
import StepHeader from "../@components/signUp/stepHeader";
import StepMain from "../@components/signUp/stepMain";
import background from "../assets/icon/signupBackgroundIc.svg";
import { SIGNUP_STEP } from "../core/signUp/stepRenderer";

export default function SignupStepPage() {
  const [step, setStep] = useState<string>(SIGNUP_STEP.ROLE);

  return (
    <>
      <BackButtonWrapper>{/* <SignUpBackButton /> */}</BackButtonWrapper>
      <SignUpContainer>
        <Img src={background} alt="배경" />
        <SignUpStepWrapper>
          <StepBox>
            <StepHeader step={step} />
            <StepMain step={step} setStep={setStep} />
            <StepFooter step={step} />
          </StepBox>
        </SignUpStepWrapper>
      </SignUpContainer>
    </>
  );
}

const BackButtonWrapper = styled.div`
  margin: 5.9rem 0 0 7.9rem;
`;

const SignUpContainer = styled.div`
  width: 192rem;
  height: 98rem;
`;

const Img = styled.img`
  position: absolute;
  width: 192rem;
  height: 98rem;
`;

const SignUpStepWrapper = styled.div`
  display: flex;

  position: absolute;
`;

const StepBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 77.9rem;
  height: 88.8rem;

  right: 18.1rem;

  backdrop-filter: blur(1rem);

  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);

  background-origin: border-box;
  background-clip: content-box, border-box;
`;
