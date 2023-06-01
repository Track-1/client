import styled from "styled-components";
import { SignupBackgroundIc } from "../assets";

export default function SignupStepPage() {
  return (
    <>
      <SignupBackgroundIcon />
    </>
  );
}

const SignupBackgroundIcon = styled(SignupBackgroundIc)`
  width: 192rem;
  margin-top: 26rem;
`;
