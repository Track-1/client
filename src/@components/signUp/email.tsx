import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { SignupEmailResendIc, SignupEmailVerifyIc, SignupSendCodeIc } from "../../assets";
import { EMAIL_MESSAGE, VERIFICATION_CODE_MESSAGE } from "../../core/signUp/errorMessage";
import useSendCode from "../../hooks/signUp/useSendCode";
import useVerifyCode from "../../hooks/signUp/useVerifyCode";
import { signupRole } from "../../recoil/signUp/role";
import { emailInputType, verificationCodeInputType } from "../../type/signUp/inputType";
import { checkEmailForm } from "../../utils/signUp/checkForm";
import { checkInputUnderline, checkMessageColor } from "../../utils/signUp/inputStyle";
import CheckErrorIcon from "./checkErrorIcon";

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
  const { authMail, sendCodeError, isSendCodeError, isSendCodeSuccess }: any = useSendCode();
  const { verifyCode, isVerifyError, verifyError, isVerifySuccess } = useVerifyCode();
  const role = useRecoilValue<string>(signupRole);

  function checkIsEmailActive() {
    return emails.message === EMAIL_MESSAGE.SUCCESS;
  }

  function checkIsVerificationCodeActive() {
    return verificationCodes.message === VERIFICATION_CODE_MESSAGE.ACTIVE;
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setIsSendCode(false);
    if (input === "") {
      setEmails({ email: input, message: EMAIL_MESSAGE.NULL });
    }
    if (checkEmailForm(input)) {
      setEmails({ email: input, message: EMAIL_MESSAGE.SUCCESS });
    }
    if (input !== "" && !checkEmailForm(input)) {
      setEmails({ ...emails, message: EMAIL_MESSAGE.FORM });
    }
  }

  function handleChangeVerificationCode(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    if (input !== "") {
      setVerificationCodes({ verificationCode: input, message: VERIFICATION_CODE_MESSAGE.ACTIVE });
    } else {
      setVerificationCodes({ ...verificationCodes, message: VERIFICATION_CODE_MESSAGE.NULL });
    }
  }

  function handleSendCode() {
    if (checkEmailForm(emails.email)) {
      // 이메일 중복 검사 post
      authMail({ tableName: role, userEmail: emails.email });
    }
  }

  useEffect(() => {
    if (isSendCodeError) {
      sendCodeError.response.data.message === "중복된 이메일입니다" &&
        setEmails({ ...emails, message: EMAIL_MESSAGE.DUPLICATION });
    }
    if (isSendCodeSuccess) {
      setEmails({ ...emails, message: EMAIL_MESSAGE.TIME });
      setIsSendCode(true);
    }
  }, [isSendCodeError, isSendCodeSuccess]);

  function handleVerifyCode() {
    // 인증 코드 검사 post
    verifyCode({
      tableName: role,
      userEmail: emails.email,
      verificationCode: verificationCodes.verificationCode,
    });
  }

  useEffect(() => {
    if (isVerifyError) {
      setVerificationCodes({ ...verificationCodes, message: VERIFICATION_CODE_MESSAGE.ERROR });
    }
    if (isVerifySuccess) {
      setIsSendCode(false);
    }
  }, [isVerifyError, isVerifySuccess]);

  return (
    <>
      <InputContainer>
        <Text>What’s your email?</Text>
        <InputWrapper>
          <Input
            type="email"
            placeholder="Enter your email address"
            onChange={handleChangeEmail}
            underline={checkInputUnderline(emails.message)}
            autoComplete="off"
          />
          {CheckErrorIcon(emails.message) && <IconWrapper>{CheckErrorIcon(emails.message)}</IconWrapper>}
          {!isSendCode ? (
            <Button isActive={checkIsEmailActive()} onClick={handleSendCode}>
              <SignupSendCodeIc />
            </Button>
          ) : (
            <Button isActive={true} onClick={handleSendCode}>
              <SignupEmailResendIc />
            </Button>
          )}
        </InputWrapper>
        <MessageWrapper textColor={checkMessageColor(emails.message)}>{emails.message}</MessageWrapper>
      </InputContainer>
      {isSendCode && (
        <InputContainer>
          <Text>Verification code</Text>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Verify your email address"
              onChange={handleChangeVerificationCode}
              underline={checkInputUnderline(verificationCodes.message)}
            />
            {CheckErrorIcon(verificationCodes.message) && (
              <IconWrapper>{CheckErrorIcon(verificationCodes.message)}</IconWrapper>
            )}
            <Button isActive={checkIsVerificationCodeActive()} onClick={handleVerifyCode}>
              <SignupEmailVerifyIc />
            </Button>
          </InputWrapper>
          <MessageWrapper textColor={checkMessageColor(verificationCodes.message)}>
            {verificationCodes.message}
          </MessageWrapper>
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

const Input = styled.input<{ underline: string }>`
  width: 42.2rem;
  height: 4rem;

  border-bottom: 1px solid ${({ underline }) => underline};

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
  height: 3.5rem;
`;

const IconWrapper = styled.div`
  margin-left: -3.9rem;
`;

const MessageWrapper = styled.p<{ textColor: string }>`
  margin-top: 1.1rem;

  color: ${({ textColor }) => textColor};

  ${({ theme }) => theme.fonts.message};
`;
