import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SignupEmailPasswordTitleIc } from "../../assets";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import Email from "./email";

export default function EmailPassword() {
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const [email, setEmail] = useState<string>("");

  return (
    <>
      <SignupEmailPasswordTitleIcon />
      <Email email={email} setEmail={setEmail} />
    </>
  );
}

const SignupEmailPasswordTitleIcon = styled(SignupEmailPasswordTitleIc)`
  width: 48.3rem;

  margin-top: 8rem;
`;
