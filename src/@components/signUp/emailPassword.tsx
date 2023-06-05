import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SignupEmailPasswordTitleIc } from "../../assets";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { emailInputType } from "../../type/signUp/inputType";
import Email from "./email";

export default function EmailPassword() {
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const [emails, setEmails] = useState<emailInputType>({
    email: "",
    message: EMAIL_MESSAGE.NULL,
  });

  return (
    <>
      <SignupEmailPasswordTitleIcon />
      <Email emails={emails} setEmails={setEmails} />
    </>
  );
}

const SignupEmailPasswordTitleIcon = styled(SignupEmailPasswordTitleIc)`
  width: 48.3rem;

  margin-top: 8rem;
`;
