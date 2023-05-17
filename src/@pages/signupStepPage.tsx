import React from "react";
import { SignupBackgroundIc } from "../assets";
import styled from "styled-components";

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
