import styled, { css } from "styled-components";
import {
  ResetPasswordTitleIc,
  ShowPasswordIc,
  HiddenPasswordIc,
  DefaultSaveBtnIc,
  SaveBtnIc,
  InputSuccessIc,
  InputWarningIc,
} from "../../assets";
import { useEffect, useState } from "react";
import { passwordInvalidMessage } from "../../core/userInfoErrorMessage/passwordInvalidMessage";

import { checkPasswordForm } from "../../utils/errorMessage/checkPasswordForm";
import { useMutation } from "react-query";
import { patchResetPassword } from "../../core/api/resetPassword";

export default function ResetPasswordInput() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [passwordMessage, setPasswordMessage] = useState<string>(passwordInvalidMessage.NULL);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>(passwordInvalidMessage.NULL);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { mutate } = useMutation(() => patchResetPassword(password));

  useEffect(() => {
    if (!confirmPassword) {
      setConfirmPasswordMessage(passwordInvalidMessage.NULL);
    } else {
      password === confirmPassword && checkPasswordForm(confirmPassword)
        ? setConfirmPasswordMessage(passwordInvalidMessage.SUCCESS)
        : setConfirmPasswordMessage(passwordInvalidMessage.MATCH);
    }
  }, [password]);

  function validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    setPassword(input);

    if (!input) {
      setPasswordMessage(passwordInvalidMessage.NULL);
    } else if (!checkPasswordForm(input)) {
      setPasswordMessage(passwordInvalidMessage.FORM);
    } else if (checkPasswordForm(input)) {
      setPasswordMessage(passwordInvalidMessage.SUCCESS);
    }
  }

  function validateConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    setConfirmPassword(input);

    if (!input) {
      setConfirmPasswordMessage(passwordInvalidMessage.NULL);
    } else if (password !== input) {
      setConfirmPasswordMessage(passwordInvalidMessage.MATCH);
    } else if (!checkPasswordForm(input)) {
      setConfirmPasswordMessage(passwordInvalidMessage.FORM);
    } else if (checkPasswordForm(input)) {
      setConfirmPasswordMessage(passwordInvalidMessage.SUCCESS);
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

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <ResetPasswordTitleIc />
        </TitleWrapper>
        <InputBox>
          <InputTitle>New password</InputTitle>
          <InputWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter new password"
              onChange={validatePassword}
            />
            {showIcon(passwordMessage)}
            {showPassword ? (
              <HiddenPasswordIcon onClick={() => setShowPassword((prev) => !prev)} />
            ) : (
              <ShowPasswordIcon onClick={() => setShowPassword((prev) => !prev)} />
            )}
          </InputWrapper>
          <UnderLine inputState={passwordMessage} />
          {passwordMessage !== passwordInvalidMessage.NULL && passwordMessage !== passwordInvalidMessage.SUCCESS && (
            <WarningMessage>{passwordMessage}</WarningMessage>
          )}
        </InputBox>

        <InputBox>
          <InputTitle>Confirm your new password</InputTitle>
          <InputWrapper>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter new password again"
              onChange={validateConfirmPassword}
            />
            {showIcon(confirmPasswordMessage)}
            {showConfirmPassword ? (
              <HiddenPasswordIcon onClick={() => setShowConfirmPassword((prev) => !prev)} />
            ) : (
              <ShowPasswordIcon onClick={() => setShowConfirmPassword((prev) => !prev)} />
            )}
          </InputWrapper>
          {/* 밑줄 상태 변경해야된다. */}
          <UnderLine inputState={confirmPasswordMessage} />
          {confirmPasswordMessage !== passwordInvalidMessage.NULL &&
            confirmPasswordMessage !== passwordInvalidMessage.SUCCESS && (
              <WarningMessage>{confirmPasswordMessage}</WarningMessage>
            )}
        </InputBox>
        <SentenceWrapper>
          {/* 줄간격 조정해야된다 */}
          <Sentence>
            If you save your new password, <br />
            your account will be signed out everywhere
          </Sentence>
        </SentenceWrapper>
        <SaveBtnWrapper>
          {checkPasswordForm(password) && password === confirmPassword ? (
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
  margin-top: 4.8rem;
`;

const InputTitle = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray2};
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

const WarningMessage = styled.span`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.red};
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
  justify-content: center;
  height: 4.3rem;

  margin-top: 5.9rem;
`;

const Sentence = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray3};

  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.8rem;
  text-align: center;
`;

const InputSuccessIcon = styled(InputSuccessIc)`
  margin-right: 2rem;
`;
const InputWarningIcon = styled(InputWarningIc)`
  margin-right: 2rem;
`;

const ShowPasswordIcon = styled(ShowPasswordIc)`
  cursor: pointer;
`;

const HiddenPasswordIcon = styled(HiddenPasswordIc)`
  cursor: pointer;
`;

const SaveBtnWrapper = styled.div`
  margin-top: 2.2rem;
`;

const DefaultSaveBtnIcon = styled(DefaultSaveBtnIc)`
  cursor: pointer;
`;

const SaveBtnIcon = styled(SaveBtnIc)`
  cursor: pointer;
`;
