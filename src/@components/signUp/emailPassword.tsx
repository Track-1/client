import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SignupEmailPasswordTitleIc, SignupSendCodeIc } from "../../assets";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { checkEmailForm } from "../../utils/signUp/checkForm";

export default function EmailPassword() {
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const [email, setEmail] = useState<string>("");

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    if (!input && checkEmailForm(input)) {
      setEmail(input);
    }
  }

  return (
    <>
      <SignupEmailPasswordTitleIcon />
      <EmailInputContainer>
        <EmailText>What’s your email?</EmailText>
        <EmailInputWrapper>
          <EmailInput placeholder="Enter your email address" onChange={handleChangeEmail} />
          <EmailButton>
            <SignupSendCodeIc />
          </EmailButton>
        </EmailInputWrapper>
      </EmailInputContainer>
    </>
  );
}

const SignupEmailPasswordTitleIcon = styled(SignupEmailPasswordTitleIc)`
  width: 48.3rem;

  margin-top: 8rem;
`;

const EmailInputContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const EmailText = styled.h1`
  margin: 13.4rem 0 3rem 0;

  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};
`;

const EmailInput = styled.input`
  width: 42.2rem;
  height: 4rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.input};
`;

const EmailButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 12.7rem;
  height: 4rem;

  border-radius: 2.2rem;
  background-color: ${({ theme }) => theme.colors.gray4};
`;

const EmailInputWrapper = styled.article`
  display: flex;
  justify-content: space-between;

  width: 56rem;
`;
