import { useState } from "react";
import styled from "styled-components";
import { SignupEmailResendIc, SignupEmailVerifyIc, SignupSendCodeIc } from "../../assets";
import { EMAIL_MESSAGE, VERIFICATION_CODE_MESSAGE } from "../../core/signUp/errorMessage";
import { emailInputType, verificationCodeInputType } from "../../type/signUp/inputType";
import { checkEmailForm } from "../../utils/signUp/checkForm";

interface EmailProps {
  emails: emailInputType;
  setEmails: React.Dispatch<React.SetStateAction<emailInputType>>;
}

export default function Email(props: EmailProps) {
  const { emails, setEmails } = props;
  const [verificationCodes, setVerificationCodes] = useState<verificationCodeInputType>({
    verificationCode: "",
    message: VERIFICATION_CODE_MESSAGE.NULL,
  });
  const [isSendCode, setIsSendCode] = useState<boolean>(false);

  function checkIsEmailActive() {
    return emails.message === EMAIL_MESSAGE.ACTIVE;
  }

  function checkIsVerificationCodeActive() {
    return verificationCodes.message === VERIFICATION_CODE_MESSAGE.ACTIVE;
  }

  function handleChangeEmail(e: any) {
    const input = e.target.value;
    setIsSendCode(false);
    if (checkEmailForm(input)) {
      setEmails({ email: input, message: EMAIL_MESSAGE.ACTIVE });
    } else {
      setEmails({ ...emails, message: EMAIL_MESSAGE.NULL });
    }
  }

  function handleChangeVerificationCode(e: any) {
    const input = e.target.value;
    if (checkEmailForm(input)) {
      setVerificationCodes({ verificationCode: input, message: VERIFICATION_CODE_MESSAGE.ACTIVE });
    } else {
      setVerificationCodes({ ...verificationCodes, message: VERIFICATION_CODE_MESSAGE.NULL });
    }
  }

  function handleSendCode() {
    setIsSendCode(true);
  }

  return (
    <>
      <InputContainer>
        <Text>What’s your email?</Text>
        <InputWrapper>
          <Input placeholder="Enter your email address" onChange={handleChangeEmail} />
          {!isSendCode ? (
            <Button isActive={checkIsEmailActive()}>
              <SignupSendCodeIc onClick={handleSendCode} />
            </Button>
          ) : (
            <Button isActive={true}>
              <SignupEmailResendIc />
            </Button>
          )}
        </InputWrapper>
      </InputContainer>
      {isSendCode && (
        <InputContainer>
          <Text>Verification code</Text>
          <InputWrapper>
            <Input placeholder="Verify your email address" onChange={handleChangeVerificationCode} />
            <Button isActive={checkIsVerificationCodeActive()}>
              <SignupEmailVerifyIc />
            </Button>
          </InputWrapper>
        </InputContainer>
      )}
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
