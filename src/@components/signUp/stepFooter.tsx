import styled from "styled-components";
import { SignupStepBackArrowIc, SignupStepContinueIc } from "../../assets";
import { StepProp } from "../../type/signUp/stepProps";

export default function StepFooter(props: StepProp) {
  const { step } = props;

  return (
    <FooterWrapper>
      <SignupStepBackArrowIc />
      <SignupStepContinueIc />
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
