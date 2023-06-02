import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SignupStepBackArrowIc, SignupStepContinueIc } from "../../assets";
import { SIGNUP_STEP } from "../../core/signUp/stepRenderer";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { StepMainProps } from "./stepMain";

export default function StepFooter(props: StepMainProps) {
  const { step, setStep } = props;
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const navigate = useNavigate();

  function checkNextStep() {
    switch (step) {
      case SIGNUP_STEP.ROLE:
        setStep(SIGNUP_STEP.EMAIL_PASSWORD);
        break;
      case SIGNUP_STEP.EMAIL_PASSWORD:
        setStep(SIGNUP_STEP.NICKNAME_CONVENTION);
        break;
      case SIGNUP_STEP.NICKNAME_CONVENTION:
        navigate("/signup/profile");
        break;
      default:
        break;
    }
  }

  function checkPrevStep() {
    switch (step) {
      case SIGNUP_STEP.ROLE:
        break;
      case SIGNUP_STEP.EMAIL_PASSWORD:
        setStep(SIGNUP_STEP.ROLE);
        break;
      case SIGNUP_STEP.NICKNAME_CONVENTION:
        setStep(SIGNUP_STEP.EMAIL_PASSWORD);
        break;
      default:
        break;
    }
  }

  function handleMoveToPrevStep() {
    setIsSuccess(false);
    checkPrevStep();
  }

  function handleMoveToNextStep() {
    setIsSuccess(false);
    checkNextStep();
  }

  function checkStepRole() {
    return step === SIGNUP_STEP.ROLE;
  }

  return (
    <FooterWrapper>
      {checkStepRole() ? <Blank /> : <SignupStepBackArrowIc onClick={handleMoveToPrevStep} />}
      <ContinueButtonWrapper isSuccess={isSuccess}>
        <SignupStepContinueIc onClick={handleMoveToNextStep} />
      </ContinueButtonWrapper>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  bottom: 7rem;

  width: 55.8rem;
  height: 4.6rem;
`;

const ContinueButtonWrapper = styled.button<{ isSuccess: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 17rem;
  height: 4.6rem;

  border-radius: 2.5rem;
  background-color: ${({ theme, isSuccess }) => (isSuccess ? theme.colors.main : theme.colors.gray4)};
`;

const Blank = styled.div`
  width: 10.2rem;
`;
