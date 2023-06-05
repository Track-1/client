import { useState } from "react";
import styled from "styled-components";
import { SignupSendCodeIc } from "../../assets";
import { checkEmailForm } from "../../utils/signUp/checkForm";

interface EmailProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function Email(props: EmailProps) {
  const { email, setEmail } = props;
  const [isEmailActive, setIsEmailActive] = useState<boolean>(false);

  function handleChangeEmail(e: any) {
    const input = e.target.value;
    if (checkEmailForm(input)) {
      setEmail(input);
      setIsEmailActive(true);
    } else {
      setIsEmailActive(false);
    }
  }

  return (
    <>
      <InputContainer>
        <Text>What’s your email?</Text>
        <InputWrapper>
          <Input placeholder="Enter your email address" onChange={handleChangeEmail} />
          <Button isActive={isEmailActive}>
            <SignupSendCodeIc />
            SignupEmailResendIc
          </Button>
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <Text>Verification code</Text>
        <InputWrapper>
          <Input placeholder="Verify your email address" onChange={handleChangeVerificationCode} />
          <Button isActive={isVerificationActive}>
            <SignupEmailVerifyIc />
          </Button>
        </InputWrapper>
      </InputContainer>
    </>
  );
}

const InputContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Text = styled.h1`
  margin: 13.4rem 0 3rem 0;

  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};
`;

const Input = styled.input`
  width: 42.2rem;
  height: 4rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.input};
`;

const Button = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 12.7rem;
  height: 4rem;

  border-radius: 2.2rem;
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.main : theme.colors.gray4)};
`;

const InputWrapper = styled.article`
  display: flex;
  justify-content: space-between;

  width: 56rem;
`;
