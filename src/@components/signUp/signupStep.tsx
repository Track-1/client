import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import background from "../../assets/icon/signupBackgroundIc.svg";
import { SIGNUP_STEP } from "../../core/signUp/stepRenderer";
import useConventionModal from "../../hooks/common/useConventionModal";
import { role } from "../../recoil/common/role";
import ConventionModal from "../@common/conventionModal";
import Footer from "../@common/footer";
import SignUpBackButton from "./signUpBackButton";
import StepFooter from "./stepFooter";
import StepHeader from "./stepHeader";
import StepMain from "./stepMain";

export default function SignupStep() {
  const [step, setStep] = useState(SIGNUP_STEP.ROLE);
  const { conventionModalInform } = useConventionModal();
  const [userType, setUserType] = useRecoilState(role);

  useEffect(() => {
    setUserType("");
  }, []);

  return (
    <>
      {conventionModalInform?.isOpen && <ConventionModal />}
      <BackButtonWrapper>
        <SignUpBackButton />
      </BackButtonWrapper>
      <SignUpContainer>
        <Img src={background} alt="배경" />

        <StepBox>
          <StepHeader step={step} />
          <StepMain step={step} />
          <StepFooter step={step} setStep={setStep} />
        </StepBox>
      </SignUpContainer>
      <Footer />
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
