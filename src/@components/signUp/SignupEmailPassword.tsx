import React from "react";
import styled from "styled-components";
import {
  ConfirmPasswordTextIc,
  CreateAPasswordForYourAccountTitleIc,
  SignUpBackArrowIc,
  SignUpEmailTitleIc,
  SignUpErrorIc,
  SignUpEyeIc,
  SignUpEyeXIc,
  SignUpPasswordIc,
  SignUpVerifyIc,
  VerificationCodeTextIc,
  WeSentYouACodeTextIc,
  WhatsYourEmailIc,
} from "../../assets";
import { SetPropsType } from "../../type/signUpStepTypes";
import { useState } from "react";
import SendCodeButton from "./sendCodeButton";
import { emailInvalidMessage } from "../../core/userInfoErrorMessage/emailInvalidMessage";
import { checkEmailForm } from "../../utils/errorMessage/checkEmailForm";
import { authEmail, repostAuthEmail, checkEmailDuplication, postVerifyCode } from "../../core/api/signUp";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import VerifyButton from "./verifyButton";
import ContinueButton from "./continueButton";
import { signUpStep } from "../../core/signUp/signupStepType";
import { verificationCodeInvalidMessage } from "../../core/userInfoErrorMessage/verificationCodeInvalidMessage";
import { setInputUnderline, setMessageColor } from "../../utils/errorMessage/setInputStyle";
import { passwordInvalidMessage } from "../../core/userInfoErrorMessage/passwordInvalidMessage";
import { checkPasswordForm } from "../../utils/errorMessage/checkPasswordForm";
import { passwordConfirmType } from "../../core/signUp/passwordConfirm";
import { continueType } from "../../core/signUp/continueType";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserType } from "../../recoil/main";
import { checkHashtagLength } from "../../utils/convention/checkHashtagLength";

export default function SignupEmailPassword(props: SetPropsType) {
  const { setStep, setUserData } = props;
  const [email, setEmail] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>(emailInvalidMessage.NULL);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>(passwordInvalidMessage.NULL);
  const [isSendCode, setIsSendCode] = useState<boolean>(false);
  const [isResendCode, setIsResendCode] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [verificationCodeMessage, setVerificationCodeMessage] = useState<string>(verificationCodeInvalidMessage.NULL);
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>(passwordInvalidMessage.NULL);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState<boolean>(false);
  const tableName = useRecoilValue<string>(UserType);
  const [isVerifyClicked, setIsVerifyClicked] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useRecoilState<string>(UserType);

  function writeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setIsSendCode(false);
    if (emailMessage === emailInvalidMessage.VERIFY) {
      setIsSendCode(false);
      setEmailMessage(emailInvalidMessage.NULL);
      setPasswordMessage(passwordInvalidMessage.NULL);
      setPasswordConfirmMessage(passwordInvalidMessage.NULL);
      setPassword("");
      setPasswordConfirm("");
      setIsShowPassword(false);
      setIsShowPasswordConfirm(false);
    } else {
      if (!e.target.value) {
        setEmailMessage(emailInvalidMessage.NULL);
      }
      if (!checkEmailForm(e.target.value)) {
        setEmailMessage(emailInvalidMessage.FORM);
      }

      if (checkEmailForm(e.target.value)) {
        setEmail(e.target.value);
        setEmailMessage(emailInvalidMessage.ING);
      }
    }
    setEmail(e.target.value);
  }

  useEffect(() => {
    if (email === "") {
      setEmailMessage(emailInvalidMessage.NULL);
    }

    if (password === "") {
      setPasswordMessage(passwordInvalidMessage.NULL);
    }

    if (passwordConfirm === "") {
      setPasswordConfirmMessage(passwordInvalidMessage.NULL);
    }
  }, [email, password, passwordConfirm]);

  //auth-mail post
  const PostAuthMail = useMutation(authEmail, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("email");
      setEmail(email);
      setEmailMessage(emailInvalidMessage.TIME);
      alert(
        "Authentication code sent. Please check your mailbox. \nIf you haven't received the mail, please check your spam mail box.\n인증코드를 보냈습니다. 메일함을 확인해주세요. \n메일을 받지 못하셨다면 스팸메일함을 확인해주세요.",
      );
    },
    onError: (error: any) => {
      console.log(error);
      if (error.response.data.message === "중복된 이메일입니다") {
        setEmailMessage(emailInvalidMessage.DUPLICATION);
      } else {
        checkEmailForm(email) && setEmailMessage(emailInvalidMessage.SUCCESS);
      }
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    let formData = new FormData();
    formData.append("tableName", tableName);
    formData.append("userEmail", email);
    isSendCode && PostAuthMail.mutate(formData);
  }, [isSendCode]);
  //auth-mail post end

  //auth-mail-repost
  const RepostAuthMail = useMutation(repostAuthEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries("email-repost");
      setEmail(email);
      setEmailMessage(emailInvalidMessage.TIME);
      alert("Please check your email. \n If you got no mail, please check your spam mail, too.");
    },
    onError: (error: any) => {
      console.log(error);
      if (error.response.data.message === "중복된 이메일입니다") {
        setEmailMessage(emailInvalidMessage.DUPLICATION);
      } else {
        checkEmailForm(email) && setEmailMessage(emailInvalidMessage.SUCCESS);
      }
    },
  });

  useEffect(() => {
    let formData = new FormData();
    formData.append("tableName", tableName);
    formData.append("userEmail", email);
    RepostAuthMail.mutate(formData);
  }, [isResendCode]);
  //auth-mail post end

  function writePassword(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setPasswordMessage(passwordInvalidMessage.NULL);
    }
    console.log(checkHashtagLength(e.target.value));
    if (
      !checkPasswordForm(e.target.value) ||
      e.target.value.length < 8 ||
      e.target.value.length > 25 ||
      checkHashtagLength(e.target.value)
    ) {
      setPasswordMessage(passwordInvalidMessage.FORM);
    }

    if (
      checkPasswordForm(e.target.value) &&
      e.target.value.length >= 8 &&
      e.target.value.length <= 25 &&
      !checkHashtagLength(e.target.value)
    ) {
      setPasswordMessage(passwordInvalidMessage.SUCCESS);
    }
    if (passwordConfirm !== "" && password !== passwordConfirm) {
      setPasswordConfirmMessage(passwordInvalidMessage.MATCH);
    }

    if (e.target.value === passwordConfirm) {
      setPasswordConfirmMessage(passwordInvalidMessage.SUCCESS);
    }

    setPassword(e.target.value);
  }

  useEffect(() => {
    if (password !== "" && passwordConfirm !== "" && password !== passwordConfirm) {
      setPasswordConfirmMessage(passwordInvalidMessage.MATCH);
    }
  }, [password, passwordConfirm]);

  function writePasswordConfirm(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setPasswordConfirmMessage(passwordInvalidMessage.NULL);
    }

    if (e.target.value !== password) {
      setPasswordConfirmMessage(passwordInvalidMessage.MATCH);
    }

    if (e.target.value === password) {
      setPasswordConfirmMessage(passwordInvalidMessage.SUCCESS);
    }

    setPasswordConfirm(e.target.value);
  }

  function writeVerificationCode(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setVerificationCodeMessage(verificationCodeInvalidMessage.NULL);
    } else {
      setVerificationCodeMessage(verificationCodeInvalidMessage.ING);
    }
    setVerificationCode(e.target.value);
  }

  function isEmailSuccess() {
    return (
      emailMessage === emailInvalidMessage.SUCCESS ||
      emailMessage === emailInvalidMessage.ING ||
      emailMessage === emailInvalidMessage.TIME
    );
  }

  // sendCode나 resend 버튼 클릭
  function sendCode(e: React.MouseEvent) {
    if (isActive()) {
      setVerificationCode("");
      setVerificationCodeMessage(verificationCodeInvalidMessage.NULL);
      isSendCode && emailMessage !== emailInvalidMessage.DUPLICATION && setIsResendCode((prev) => !prev);
      if (isEmailSuccess()) {
        setIsSendCode(true);
        setIsVerify(false);
      }
    }
  }

  function verifyCode(e: React.MouseEvent) {
    setIsVerifyClicked(!isVerifyClicked);
  }

  //verifycode post
  const VerifyCode = useMutation(postVerifyCode, {
    onSuccess: () => {
      queryClient.invalidateQueries("verifycode");
      setVerificationCodeMessage(verificationCodeInvalidMessage.SUCCESS);
      setIsVerify(true);
      setEmailMessage(emailInvalidMessage.VERIFY);
    },
    onError: (error) => {
      verificationCode !== "" && setVerificationCodeMessage(verificationCodeInvalidMessage.ERROR);
    },
  });

  useEffect(() => {
    let formData = new FormData();
    formData.append("tableName", tableName);
    formData.append("userEmail", email);
    formData.append("verificationCode", verificationCode);
    VerifyCode.mutate(formData);
  }, [isVerifyClicked]);
  //verifycode end

  function backToRole() {
    setStep(signUpStep.SIGNUP_ROLE);
    setSelectedRole("");
  }

  function setErrorIcon(message: string) {
    switch (message) {
      case emailInvalidMessage.FORM:
        return <SignUpErrorIcon />;
      case emailInvalidMessage.DUPLICATION:
        return <SignUpErrorIcon />;
      case verificationCodeInvalidMessage.ERROR:
        return <SignUpErrorIcon />;
      case passwordInvalidMessage.FORM:
        return <SignUpErrorIcon />;
      case passwordInvalidMessage.MATCH:
        return <SignUpErrorIcon />;
      case emailInvalidMessage.VERIFY:
        return <SignUpVerifyIcon />;
      case passwordInvalidMessage.SUCCESS:
        return <SignUpVerifyIcon />;
      case emailInvalidMessage.SUCCESS:
        return;
      default:
        return;
    }
  }

  function showPassword(type: string) {
    if (type === passwordConfirmType.PASSWORD) {
      setIsShowPassword(!isShowPassword);
    } else if (type === passwordConfirmType.PASSWORD_CONFIRM) {
      setIsShowPasswordConfirm(!isShowPasswordConfirm);
    }
  }

  function setPasswordInputType(isShow: boolean) {
    return isShow ? "text" : "password";
  }

  function successNextStep() {
    return password === passwordConfirm &&
      passwordMessage === passwordInvalidMessage.SUCCESS &&
      passwordConfirmMessage === passwordInvalidMessage.SUCCESS &&
      emailMessage === emailInvalidMessage.VERIFY
      ? continueType.SUCCESS
      : continueType.FAIL;
  }

  function showTitle() {
    if (emailMessage === emailInvalidMessage.TIME) {
      return <WeSentYouACodeTextIcon />;
    } else if (isVerify) {
      return <CreateAPasswordForYourAccountTitleIcon />;
    } else {
      return <SignUpEmailTitleIcon />;
    }
  }

  function saveUserData() {
    successNextStep() && setUserData((prev) => ({ ...prev, ID: email, PW: password }));
  }

  function checkEmail() {
    return (
      emailMessage === emailInvalidMessage.SUCCESS ||
      emailMessage === emailInvalidMessage.TIME ||
      emailMessage === emailInvalidMessage.ING
    );
  }

  function isActive() {
    return checkEmail() && true;
  }

  function isLong() {
    return ((isSendCode && !isVerify && emailMessage === emailInvalidMessage.TIME) || isVerify) && true;
  }

  return (
    <>
      <TitleWrapper>{showTitle()}</TitleWrapper>

      <SignupEmailWrapper>
        <WhatsYourEmailIcon />
        <InputWrapper>
          <Input
            type="email"
            placeholder="Enter your email address"
            width={42.2}
            underline={setInputUnderline(emailMessage)}
            onChange={writeEmail}
            autoComplete="off"
          />
          {setErrorIcon(emailMessage) && <IconWrapper marginLeft={-3.9}>{setErrorIcon(emailMessage)}</IconWrapper>}
          <SendCodeButton
            isEmailSuccess={isEmailSuccess()}
            onClick={(e: React.MouseEvent<HTMLElement>) => sendCode(e)}
            isSendCode={isSendCode}
            isResendCode={isResendCode}
            emailMessage={emailMessage}
          />
        </InputWrapper>
        <MessageWrapper textColor={setMessageColor(emailMessage)}>{emailMessage}</MessageWrapper>

        {isSendCode && !isVerify && emailMessage === emailInvalidMessage.TIME && (
          <>
            <VerificationCodeTextIcon />
            <InputWrapper>
              <Input
                type="text"
                placeholder="Verify your email address"
                width={42.2}
                underline={setInputUnderline(verificationCodeMessage)}
                onChange={writeVerificationCode}
                autoComplete="nope"
              />
              {setErrorIcon(verificationCodeMessage) && (
                <IconWrapper marginLeft={-3.9}>{setErrorIcon(verificationCodeMessage)}</IconWrapper>
              )}
              <VerifyButton
                verificationCodeMessage={verificationCodeMessage}
                onClick={(e: React.MouseEvent<HTMLElement>) => verifyCode(e)}
              />
            </InputWrapper>
            <MessageWrapper textColor={setMessageColor(verificationCodeMessage)}>
              {verificationCodeMessage}
            </MessageWrapper>
          </>
        )}

        <SignUpPasswordIcon />
        <InputWrapper>
          <Input
            type={setPasswordInputType(isShowPassword)}
            placeholder="Create a password"
            width={56}
            underline={setInputUnderline(passwordMessage)}
            onChange={writePassword}
            value={password}
            maxLength={25}
            autoComplete="new-password"
          />
          {setErrorIcon(passwordMessage) && (
            <IconWrapper marginLeft={-8.4}>{setErrorIcon(passwordMessage)}</IconWrapper>
          )}
          <EyeIcWrapper onClick={() => showPassword(passwordConfirmType.PASSWORD)}>
            {isShowPassword ? <SignUpEyeXIcon /> : <SignUpEyeIcon />}
          </EyeIcWrapper>
        </InputWrapper>
        <MessageWrapper textColor={setMessageColor(passwordMessage)}>{passwordMessage}</MessageWrapper>

        {isVerify && (
          <>
            <ConfirmPasswordTextIcon />
            <InputWrapper>
              <Input
                type={setPasswordInputType(isShowPasswordConfirm)}
                placeholder="Enter a password again"
                width={56}
                underline={setInputUnderline(passwordConfirmMessage)}
                onChange={writePasswordConfirm}
                value={passwordConfirm}
                maxLength={25}
                autoComplete="new-password"
              />
              {setErrorIcon(passwordConfirmMessage) && (
                <IconWrapper marginLeft={-8.4}>{setErrorIcon(passwordConfirmMessage)}</IconWrapper>
              )}
              <EyeIcWrapper onClick={() => showPassword(passwordConfirmType.PASSWORD_CONFIRM)}>
                {isShowPasswordConfirm ? <SignUpEyeXIcon /> : <SignUpEyeIcon />}
              </EyeIcWrapper>
            </InputWrapper>
            <MessageWrapper textColor={setMessageColor(passwordConfirmMessage)}>
              {passwordConfirmMessage}
            </MessageWrapper>
          </>
        )}
      </SignupEmailWrapper>
      <ArrowButtonContainer isLong={isLong()}>
        <ArrowButtonWrapper>
          <SignUpBackArrowIcon onClick={backToRole} />
          <div onClick={saveUserData}>
            <ContinueButton
              successNextStep={successNextStep()}
              step={signUpStep.SIGNUP_NICKNAME_CONVENTION}
              setStep={setStep}
            />
          </div>
        </ArrowButtonWrapper>
      </ArrowButtonContainer>
    </>
  );
}

const TitleWrapper = styled.section`
  display: flex;
  justify-content: center;

  margin-top: 7.65rem;
`;

const WhatsYourEmailIcon = styled(WhatsYourEmailIc)`
  margin-top: 5.96rem;

  width: 20.7rem;
`;

const SignUpPasswordIcon = styled(SignUpPasswordIc)`
  margin-top: 3.2rem;

  width: 11.1rem;
`;

const SignupEmailWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 11rem;
`;

const Input = styled.input<{ width: number; underline: string }>`
  display: flex;
  align-items: center;

  padding: 3rem 0 0.5rem 0;

  width: ${({ width }) => width}rem;

  border-bottom: 0.1rem solid ${({ underline }) => underline};

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.input};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MessageWrapper = styled.p<{ textColor: string }>`
  margin-top: 1.1rem;

  color: ${({ textColor }) => textColor};

  ${({ theme }) => theme.fonts.message};
`;

const IconWrapper = styled.div<{ marginLeft: number }>`
  margin: 2rem 0 0 ${({ marginLeft }) => marginLeft}rem;
`;

const VerificationCodeTextIcon = styled(VerificationCodeTextIc)`
  margin-top: 3.2rem;

  width: 18.1rem;
`;

const ConfirmPasswordTextIcon = styled(ConfirmPasswordTextIc)`
  margin-top: 3.2rem;

  width: 20rem;
`;

const SignUpBackArrowIcon = styled(SignUpBackArrowIc)`
  width: 10.5rem;
  cursor: pointer;
`;

const ArrowButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 56rem;
`;

const ArrowButtonContainer = styled.footer<{ isLong: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  margin-top: ${({ isLong }) => (isLong ? 7.7 : 23)}rem;
`;

const EyeIcWrapper = styled.div`
  position: absolute;

  margin: 1.9rem 0 0 52rem;

  cursor: pointer; ;
`;

const SignUpEmailTitleIcon = styled(SignUpEmailTitleIc)`
  width: 48.3rem;
`;

const WeSentYouACodeTextIcon = styled(WeSentYouACodeTextIc)`
  width: 30.7rem;
`;

const CreateAPasswordForYourAccountTitleIcon = styled(CreateAPasswordForYourAccountTitleIc)`
  width: 55.5rem;
`;

const SignUpErrorIcon = styled(SignUpErrorIc)`
  width: 4rem;
  height: 4rem;
`;

const SignUpVerifyIcon = styled(SignUpVerifyIc)`
  width: 4rem;
  height: 4rem;
`;

const SignUpEyeXIcon = styled(SignUpEyeXIc)`
  width: 4rem;
  height: 4rem;
`;

const SignUpEyeIcon = styled(SignUpEyeIc)`
  width: 4rem;
  height: 4rem;
`;
