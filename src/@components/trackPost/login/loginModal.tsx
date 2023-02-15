import styled, { css } from "styled-components";
import {
  ProducerDefaultModeToggleIc,
  ProducerModeToggleIc,
  EyeIc,
  ProducerLoginBtnIc,
  VocalLoginBtnIc,
  DefaultLoginBtnIc,
} from "../../../assets";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginModal() {
  const [isProducerMode, setIsProducerMode] = useState<boolean>(false);
  const [emailInputState, setEmailInputState] = useState<string>("");
  const [passwordInputState, setPasswordInputState] = useState<string>("");
  const [isPasswordType, setIsPasswordType] = useState<boolean>(true);
  const [emailDefaultState, setEmailDefaultState] = useState<boolean>(true);
  const [passwordDefaultState, setPasswordDefaultState] = useState<boolean>(true);

  const EMAIL_RULE = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const PASSWORD_RULE = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;

  function producerToggleType() {
    return isProducerMode ? (
      <ProducerModeToggleIc onClick={() => setIsProducerMode((prev) => !prev)} style={{ cursor: "pointer" }} />
    ) : (
      <ProducerDefaultModeToggleIc onClick={() => setIsProducerMode((prev) => !prev)} style={{ cursor: "pointer" }} />
    );
  }

  function changeHoverState(
    e: React.FocusEvent<HTMLInputElement>,
    setInputState: React.Dispatch<React.SetStateAction<string>>,
    RULE: RegExp,
  ): void {
    const input = e.target.value;

    if (!RULE.test(input) && !isInputEmpty(input)) setInputState("warning");
    if (RULE.test(input)) {
      e.type === "focus" ? setInputState("focus") : setInputState("blur");
    }
    if (isInputEmpty(input)) {
      e.type === "focus" ? setInputState("focus") : setInputState("blur");
    }
  }

  function emailValidation(e: React.ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;

    isInputEmpty(email) ? setEmailDefaultState(true) : setEmailDefaultState(false);
    EMAIL_RULE.test(email) || isInputEmpty(email) ? setEmailInputState("focus") : setEmailInputState("warning");
  }

  function passwordValidation(e: React.ChangeEvent<HTMLInputElement>): void {
    const password = e.target.value;

    isInputEmpty(password) ? setPasswordDefaultState(true) : setPasswordDefaultState(false);
    PASSWORD_RULE.test(password) || isInputEmpty(password)
      ? setPasswordInputState("focus")
      : setPasswordInputState("warning");
  }

  function loginBtnType() {
    if (
      isWarningState(emailInputState) ||
      isWarningState(passwordInputState) ||
      emailDefaultState ||
      passwordDefaultState
    ) {
      return <DefaultLoginBtnIc />;
    } else {
      return isProducerMode ? <ProducerLoginBtnIc /> : <VocalLoginBtnIc />;
    }
  }

  function isInputEmpty(input: string): boolean {
    return input === "";
  }

  function isWarningState(state: string): boolean {
    return state === "warning";
  }

  return (
    <Container>
      <Wrapper>
        <Title>Log in</Title>
        <SubTitleWrapper>
          <span>If you are new user, </span>
          <StLink to="sign-up">Sign up here</StLink>
        </SubTitleWrapper>
        <InputBox>
          <InputTitle>Email</InputTitle>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Enter your email address"
              onFocus={(e) => changeHoverState(e, setEmailInputState, EMAIL_RULE)}
              onBlur={(e) => changeHoverState(e, setEmailInputState, EMAIL_RULE)}
              onChange={emailValidation}
            />
          </InputWrapper>
          <UnderLine inputState={emailInputState} />
          {isWarningState(emailInputState) && <WarningMessage>Enter a valid email</WarningMessage>}
        </InputBox>
        <InputBox>
          <InputTitle>Password</InputTitle>
          <InputWrapper>
            <Input
              type={isPasswordType ? "password" : "text"}
              autoComplete="new-password"
              placeholder="Enter your password"
              onFocus={(e) => changeHoverState(e, setPasswordInputState, PASSWORD_RULE)}
              onBlur={(e) => changeHoverState(e, setEmailInputState, PASSWORD_RULE)}
              onChange={passwordValidation}
            />

            <EyeIcon onClick={() => setIsPasswordType((prev) => !prev)} />
          </InputWrapper>
          <UnderLine inputState={passwordInputState} />
          {isWarningState(passwordInputState) && (
            <WarningMessage>Wrong password.Try again or click Forgot password to reset it.</WarningMessage>
          )}
        </InputBox>
        <ModeWrapper>
          <ModeText>Producer Mode</ModeText>
          {producerToggleType()}
        </ModeWrapper>
        <LoginBtnWrapper>{loginBtnType()}</LoginBtnWrapper>

        <ForgotMessage to="/">Forgot password</ForgotMessage>
      </Wrapper>
    </Container>
  );
}

const Container = styled.article`
  position: absolute;
  top: 9.9rem;
  left: 96rem;

  height: 88.8rem;
  width: 77.9rem;

  background: rgba(20, 21, 23, 0.6);
  backdrop-filter: blur(1rem);

  border-radius: 5rem;
`;

const Wrapper = styled.div`
  margin: 10.9rem 11rem;
`;

const Title = styled.strong`
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.white};
`;

const SubTitleWrapper = styled.div`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};

  margin-top: 3.3rem;
  margin-bottom: 2.3rem;
`;

const StLink = styled(Link)`
  color: ${({ theme }) => theme.colors.main};
`;

const InputBox = styled.div`
  margin-top: 5.9rem;
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
  color: ${({ theme }) => theme.colors.red};
  ${({ theme }) => theme.fonts.description};
  margin-top: 1.1rem;
`;

const UnderLine = styled.hr<{ inputState: string }>`
  border: 0.1rem solid;
  ${(props) => {
    switch (props.inputState) {
      case "focus":
        return css`
          border-color: ${({ theme }) => theme.colors.white};
        `;
      case "warning":
        return css`
          border-color: ${({ theme }) => theme.colors.red};
        `;
      default:
        return css`
          border-color: ${({ theme }) => theme.colors.gray3};
        `;
    }
  }}
`;

const ModeWrapper = styled.div`
  display: flex;
  align-items: center;

  float: right;

  margin-top: 5.2rem;
`;

const ModeText = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray1};
  margin: 0 1.2rem;
`;

const LoginBtnWrapper = styled.div`
  margin-top: 16rem;

  cursor: pointer;
`;

const ForgotMessage = styled(Link)`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};

  margin-top: 3.2rem;
`;

const EyeIcon = styled(EyeIc)`
  cursor: pointer;
`;
