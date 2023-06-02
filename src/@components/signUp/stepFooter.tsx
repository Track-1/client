import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SignupStepBackArrowIc, SignupStepContinueIc } from "../../assets";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { StepProp } from "../../type/signUp/stepProps";

export default function StepFooter(props: StepProp) {
  const { step } = props;
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);

  function handleMoveToNextStep() {
    setIsSuccess(false);
  }

  return (
    <FooterWrapper>
      <SignupStepBackArrowIc />
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
