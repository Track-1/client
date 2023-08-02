import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  SignupHeaderLogInHereIc,
  SignupHeaderStep1Ic,
  SignupHeaderStep2Ic,
  SignupHeaderStep3Ic,
  SignupHeaderStepBlankIc,
} from "../../assets";
import { StepProp } from "../../type/signUp/stepProps";

export default function StepHeader(props: StepProp) {
  const { step } = props;
  const navigate = useNavigate();

  function moveLoginPage() {
    navigate("/login");
  }

  function checkStepNumber(stepNumber: number) {
    return stepNumber === step;
  }

  return (
    <StepHeaderWrapper>
      <StepsWrapper>
        {checkStepNumber(1) ? <SignUpStep1Icon /> : <SignUpStepBlanckIcon />}
        {checkStepNumber(2) ? <SignUpStep2Icon /> : <SignUpStepBlanckIcon />}
        {checkStepNumber(3) ? <SignUpStep3Icon /> : <SignUpStepBlanckIcon />}
      </StepsWrapper>
      <LoginHereMessageIcon onClick={moveLoginPage} />
    </StepHeaderWrapper>
  );
}

const LoginHereMessageIcon = styled(SignupHeaderLogInHereIc)`
  width: 30.6rem;
  cursor: pointer;
`;

const StepsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 11.2rem;
  height: 2.4rem;
`;

const StepHeaderWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 56rem;
  height: 2.4rem;

  margin-top: 7rem;
`;

const SignUpStepBlanckIcon = styled(SignupHeaderStepBlankIc)`
  width: 1.8rem;
  height: 1.8rem;
`;

const SignUpStep1Icon = styled(SignupHeaderStep1Ic)`
  width: 2.4rem;
  height: 2.4rem;
`;

const SignUpStep2Icon = styled(SignupHeaderStep2Ic)`
  width: 2.4rem;
  height: 2.4rem;
`;

const SignUpStep3Icon = styled(SignupHeaderStep3Ic)`
  width: 2.4rem;
  height: 2.4rem;
`;
