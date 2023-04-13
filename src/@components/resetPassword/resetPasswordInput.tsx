import styled, { css } from "styled-components";
import {
  ResetPasswordTitleIc,
  ShowPasswordIc,
  HiddenPasswordIc,
  DefaultSaveBtnIc,
  SaveBtnIc,
  InputSuccessIc,
  InputWarningIc,
  ChangePasswordConfirmIc,
  ChangePasswordNewPasswordIc,
} from "../../assets";
import { useEffect, useState } from "react";
import { passwordInvalidMessage } from "../../core/userInfoErrorMessage/passwordInvalidMessage";

import { checkPasswordForm } from "../../utils/errorMessage/checkPasswordForm";
import { useMutation } from "react-query";
import { patchResetPassword } from "../../core/api/resetPassword";
import useMovePage from "../../utils/hooks/useMovePage";
import { onLogout } from "../../core/api/logout";
import { removeCookie } from "../../utils/cookie";
import Loading from "../@common/loading";

export default function ResetPasswordInput() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>(passwordInvalidMessage.NULL);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>(passwordInvalidMessage.NULL);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [movePage] = useMovePage();

  const { mutate, isLoading } = useMutation(() => patchResetPassword(password), {
    onSuccess: () => {
      alert("Your password has been successfully changed.\n비밀번호가 성공적으로 변경되었습니다.");
      removeCookie("forgotPasswordToken", { path: "/" });
      movePage("/");
      onLogout();
    },
    onError: (error: any) => {
      alert(error.response.data.message);
    },
  });

  useEffect(() => {
    if (!confirmPassword) {
      setConfirmPasswordMessage(passwordInvalidMessage.NULL);
    } else {
      password === confirmPassword && checkPasswordForm(confirmPassword)
        ? setConfirmPasswordMessage(passwordInvalidMessage.SUCCESS)
        : setConfirmPasswordMessage(passwordInvalidMessage.MATCH);
    }
  }, [password]);

  function isSamePassword() {
    return password === confirmPassword;
  }

  function validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setPassword(input);

    if (!input) {
      setPasswordMessage(passwordInvalidMessage.NULL);
    } else {
      checkPasswordForm(input)
        ? setPasswordMessage(passwordInvalidMessage.SUCCESS)
        : setPasswordMessage(passwordInvalidMessage.FORM);
    }
  }

  function validateConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    setConfirmPassword(input);

    if (!input) {
      setConfirmPasswordMessage(passwordInvalidMessage.NULL);
    } else if (password !== input) {
      setConfirmPasswordMessage(passwordInvalidMessage.MATCH);
    } else {
      checkPasswordForm(input)
        ? setConfirmPasswordMessage(passwordInvalidMessage.SUCCESS)
        : setConfirmPasswordMessage(passwordInvalidMessage.FORM);
    }
  }

  function showIcon(message: string) {
    switch (message) {
      case passwordInvalidMessage.FORM:
        return <InputWarningIcon />;
      case passwordInvalidMessage.MATCH:
        return <InputWarningIcon />;
      case passwordInvalidMessage.SUCCESS:
        return <InputSuccessIcon />;
      default:
        return;
    }
  }

  function checkError(messages: string) {
    if (
      messages === passwordInvalidMessage.NULL ||
      messages === passwordInvalidMessage.SUCCESS ||
      passwordInvalidMessage.SUCCESS ||
      passwordInvalidMessage.NULL
    ) {
      return false;
    } else if (messages === passwordInvalidMessage.FORM || passwordInvalidMessage.MATCH) {
      return true;
    }
    return false;
  }

  return (
    <Container>
      {isLoading && <Loading />}
      <Wrapper>
        <TitleWrapper>
          <ResetPasswordTitleIcon />
        </TitleWrapper>
        <InputBox>
          <ChangePasswordNewPasswordIcon />
          <InputWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter new password"
              onChange={validatePassword}
            />
            {showIcon(passwordMessage)}
            {showPassword ? (
              <HiddenPasswordIcon onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <ShowPasswordIcon onClick={() => setShowPassword(!showPassword)} />
            )}
          </InputWrapper>
          <UnderLine inputState={passwordMessage} />
          {passwordMessage !== passwordInvalidMessage.NULL && passwordMessage !== passwordInvalidMessage.SUCCESS ? (
            <WarningMessage isError={true}>{passwordMessage}</WarningMessage>
          ) : (
            <WarningMessage isError={false}>{passwordMessage}</WarningMessage>
          )}
        </InputBox>

        <InputBox>
          <ChangePasswordConfirmIcon />
          <InputWrapper>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter new password again"
              onChange={validateConfirmPassword}
            />
            {showIcon(confirmPasswordMessage)}
            {showConfirmPassword ? (
              <HiddenPasswordIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
            ) : (
              <ShowPasswordIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
            )}
          </InputWrapper>
          <UnderLine inputState={confirmPasswordMessage} />
          {confirmPasswordMessage !== passwordInvalidMessage.NULL &&
          confirmPasswordMessage !== passwordInvalidMessage.SUCCESS ? (
            <WarningMessage isError={true}>{confirmPasswordMessage}</WarningMessage>
          ) : (
            <WarningMessage isError={false}>{confirmPasswordMessage}</WarningMessage>
          )}
        </InputBox>
        <SentenceWrapper>
          <Sentence>If you save your new password,</Sentence>
          <Sentence>your account will be signed out everywhere</Sentence>
        </SentenceWrapper>
        <SaveBtnWrapper>
          {checkPasswordForm(password) && isSamePassword() ? (
            <SaveBtnIcon onClick={() => mutate()} />
          ) : (
            <DefaultSaveBtnIcon />
          )}
        </SaveBtnWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 29.4rem;
  left: 0;
  right: 0;

  margin: 0 auto;

  height: 66.2rem;
  width: 77.9rem;

  backdrop-filter: blur(1rem);
  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const Wrapper = styled.div`
  margin: 0 11rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;

  height: 6rem;

  margin-top: 7.5rem;
`;

const InputBox = styled.div`
  margin-top: 1.8rem;
`;

const ChangePasswordNewPasswordIcon = styled(ChangePasswordNewPasswordIc)`
  width: 16.3rem;
  margin-top: 3rem;
`;

const ChangePasswordConfirmIcon = styled(ChangePasswordConfirmIc)`
  width: 30.9rem;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
`;

const Input = styled.input`
  height: 3.4rem;
  width: 100%;

  ${({ theme }) => theme.fonts.comment};

  color: ${({ theme }) => theme.colors.white};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
  border: none;
`;

const WarningMessage = styled.span<{ isError: boolean }>`
  width: 100%;
  height: 3rem;
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme, isError }) => (isError ? theme.colors.red : "transparent")};

  margin-top: 1.1rem;
`;

const UnderLine = styled.hr<{ inputState: string }>`
  border: 0.1rem solid;
  ${(props) => {
    if (props.inputState === passwordInvalidMessage.FORM || props.inputState === passwordInvalidMessage.MATCH) {
      return css`
        border-color: ${({ theme }) => theme.colors.red};
      `;
    } else if (props.inputState === passwordInvalidMessage.SUCCESS) {
      return css`
        border-color: ${({ theme }) => theme.colors.main};
      `;
    } else {
      return css`
        border-color: ${({ theme }) => theme.colors.white};
      `;
    }
  }}
`;

const SentenceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 4.3rem;

  margin-top: 2.9rem;
`;

const Sentence = styled.p`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray3};

  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.8rem;
  text-align: center;
`;

const InputSuccessIcon = styled(InputSuccessIc)`
  width: 2.2rem;
  margin-right: 2rem;
`;
const InputWarningIcon = styled(InputWarningIc)`
  width: 2.2rem;
  margin-right: 2rem;
`;

const ShowPasswordIcon = styled(ShowPasswordIc)`
  width: 2.7rem;
  height: 2.7rem;
  cursor: pointer;
`;

const HiddenPasswordIcon = styled(HiddenPasswordIc)`
  width: 2.7rem;
  height: 2.7rem;
  cursor: pointer;
`;

const SaveBtnWrapper = styled.div`
  margin-top: 2.2rem;
`;

const DefaultSaveBtnIcon = styled(DefaultSaveBtnIc)`
  width: 56rem;
  cursor: pointer;
`;

const SaveBtnIcon = styled(SaveBtnIc)`
  width: 56rem;
  cursor: pointer;
`;

const ResetPasswordTitleIcon = styled(ResetPasswordTitleIc)`
  width: 36rem;
  margin-top: 1rem;
`;
