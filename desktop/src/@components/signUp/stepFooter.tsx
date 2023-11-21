import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { SignupCompleteIc, SignupStepBackArrowIc, SignupStepContinueIc } from "../../assets";
import { SIGNUP_STEP } from "../../core/signUp/stepRenderer";
import { useJoin } from "../../hooks/queries/user";
import { loginUserId, loginUserType } from "../../recoil/common/loginUserData";
import { role } from "../../recoil/common/role";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { joinUserData } from "../../recoil/signUp/joinUserData";
import { UserType } from "../../type/common/userType";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";
import { StepMainProps } from "../../type/signUp/stepProps";

export default function StepFooter(props: StepMainProps) {
  const { step, setStep } = props;
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const navigate = useNavigate();
  const [roleType, setRoleType] = useRecoilState<string | UserType>(role);
  const [userData, setUserData] = useRecoilState<JoinUserDataPropsType>(joinUserData);
  const setLoginUserType = useSetRecoilState(loginUserType);
  const setLoginUserId = useSetRecoilState(loginUserId);
  const { join } = useJoin();

  function checkNextStep() {
    if (isSuccess) {
      setStep(step + 1);
    }
  }

  function checkPrevStep() {
    if (step === SIGNUP_STEP.EMAIL_PASSWORD) {
      setRoleType("");
    }
    setStep(step - 1);
  }

  function checkFirstStep() {
    return step === SIGNUP_STEP.ROLE;
  }

  function checkFinalStep() {
    return step === SIGNUP_STEP.NICKNAME_CONVENTION;
  }

  function handleMoveToPrevStep() {
    setIsSuccess(false);
    checkPrevStep();
  }

  function handleMoveToNextStep() {
    if (checkFinalStep()) {
      join({ userType: roleType === "producer" ? "producer" : "vocal", formData: userData });
    } else {
      setIsSuccess(false);
      checkNextStep();
    }
  }

  return (
    <FooterWrapper>
      {checkFirstStep() ? <Blank /> : <SignupStepBackArrowIcon onClick={handleMoveToPrevStep} />}
      <ContinueButtonWrapper onClick={handleMoveToNextStep} isSuccess={isSuccess}>
        {checkFinalStep() ? <SignupCompleteIcon /> : <SignupStepContinueIcon />}
      </ContinueButtonWrapper>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
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

const SignupStepBackArrowIcon = styled(SignupStepBackArrowIc)`
  display: flex;
  align-items: center;

  width: 10.2rem;
  height: 4.5rem;

  cursor: pointer;
`;

const SignupStepContinueIcon = styled(SignupStepContinueIc)`
  width: 9.7rem;
`;

const SignupCompleteIcon = styled(SignupCompleteIc)`
  width: 9.7rem;
`;
