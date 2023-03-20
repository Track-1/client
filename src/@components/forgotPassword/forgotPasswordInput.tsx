import styled, { css } from "styled-components";
import {
  RequestResetPasswordDefaultBtnIc,
  ForgotPasswordTitleIc,
  RequestResetPasswordProducerBtnIc,
  RequestResetPasswordVocalBtnIc,
  ResendPasswordProducerBtnIc,
  ResendPasswordVocalBtnIc,
  ProducerModeToggleIc,
  ProducerDefaultModeToggleIc,
  InputWarningIc,
} from "../../assets";

import { useEffect, useState } from "react";
import { useSendNewPasswordEmail } from "../../utils/hooks/useSendNewPasswordEmail";
import { checkEmailForm } from "../../utils/errorMessage/checkEmailForm";
import { emailInvalidMessage } from "../../core/userInfoErrorMessage/emailInvalidMessage";

export default function ForgotPasswordInput() {
  const [email, setEmail] = useState<string>("");
  const [isProducerMode, setIsProducerMode] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>("vocal");
  const [resendTrigger, setResendTrigger] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>(emailInvalidMessage.NULL);
  const [recentEmail, setRecentEmail] = useState<string>("");

  const { mutate, isSuccess, isError, error } = useSendNewPasswordEmail(userType, email);

  useEffect(() => {
    isProducerMode ? setUserType("producer") : setUserType("vocal");
  }, [isProducerMode]);

  useEffect(() => {
    isSuccess && setResendTrigger(true);
  }, [isSuccess]);

  function isNotSignupEmail() {
    return isError && error?.response.status === 401;
  }

  function compareRecentEmail() {
    return email === recentEmail;
  }

  function writeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setEmail(input);

    if (!input) {
      setEmailMessage(emailInvalidMessage.NULL);
    } else {
      checkEmailForm(input) ? setEmailMessage(emailInvalidMessage.SUCCESS) : setEmailMessage(emailInvalidMessage.FORM);
    }
  }

  function onRequestCapsulation() {
    mutate();
    setRecentEmail(email);
  }


  function producerToggleType() {
    return isProducerMode ? (
      <ProducerModeToggleIcon onClick={() => setIsProducerMode(!isProducerMode)} />
    ) : (
      <ProducerDefaultModeToggleIcon onClick={() => setIsProducerMode(!isProducerMode)} />
    );
  }

  function isInputWarnning() {
    return !checkEmailForm(email) && email.length !== 0;
  }

  function requestBtnType() {
    if (!checkEmailForm(email)) {
      return <RequestResetPasswordDefaultBtnIc />;
    } else {
      if (resendTrigger && compareRecentEmail() && isSuccess) {
        return isProducerMode ? (
          <ResendPasswordProducerBtnIcon onClick={() => onRequestCapsulation()} />
        ) : (
          <ResendPasswordVocalBtnIcon onClick={() => onRequestCapsulation()} />
        );
      } else {
        return isProducerMode ? (
          <RequestResetPasswordProducerBtnIcon onClick={() => onRequestCapsulation()} />
        ) : (
          <RequestResetPasswordVocalBtnIcon onClick={() => onRequestCapsulation()} />
        );
      }
    }
  }

  function producerToggleType() {
    return isProducerMode ? (
      <ProducerModeToggleIcon onClick={() => setIsProducerMode(!isProducerMode)} />
    ) : (
      <ProducerDefaultModeToggleIcon onClick={() => setIsProducerMode(!isProducerMode)} />
    );
  }

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <ForgotPasswordTitleIc />
        </TitleWrapper>
        <InputBox>
          <InputTitle>What's your email</InputTitle>
          <InputWrapper>
            <Input placeholder="Enter your email address" onChange={writeEmail} />
            {isInputWarnning() && <InputWarningIc />}
            {isError && compareRecentEmail() && <InputWarningIc />}
          </InputWrapper>
          <UnderLine inputState={emailMessage} />
        </InputBox>
        {isNotSignupEmail() && compareRecentEmail() && (
          <WarningMessage>We don’t have an account with that email address</WarningMessage>
        )}
        {isInputWarnning() && <WarningMessage>{emailMessage}</WarningMessage>}
        {isSuccess && checkEmailForm(email) && compareRecentEmail() && (
          <ValidTimeMessage isProducerMode={isProducerMode}>Valid time is 3 hours.</ValidTimeMessage>
        )}
        <ModeWrapper>
          <ModeText>Producer Mode</ModeText>
          {producerToggleType()}
        </ModeWrapper>
        <RequestBtnWrapper>{requestBtnType()}</RequestBtnWrapper>
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

  height: 57rem;
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
  margin-top: 9.1rem;
`;

const InputBox = styled.div`
  margin-top: 6.4rem;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 2.99rem;
`;

const InputTitle = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray2};
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

const ValidTimeMessage = styled.span<{ isProducerMode: boolean }>`
  ${({ theme }) => theme.fonts.description};
  ${(props) => {
    if (props.isProducerMode) {
      return css`
        color: ${({ theme }) => theme.colors.sub1};
      `;
    } else {
      return css`
        color: ${({ theme }) => theme.colors.sub2};
      `;
    }
  }}

  margin-top: 1.1rem;
`;

const UnderLine = styled.hr<{ inputState: string }>`
  border: 0.1rem solid;
  ${(props) => {
    if (props.inputState === emailInvalidMessage.FORM) {
      return css`
        border-color: ${({ theme }) => theme.colors.red};
      `;
    } else {
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
  margin: 4.2rem 0 3.1rem;
`;

const ModeText = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray1};
  margin: 0 1.2rem;
`;

const RequestBtnWrapper = styled.div`
  margin-top: 2.2rem;
`;

const RequestResetPasswordProducerBtnIcon = styled(RequestResetPasswordProducerBtnIc)`
  width: ?rem;
  cursor: pointer;
`;

const RequestResetPasswordVocalBtnIcon = styled(RequestResetPasswordVocalBtnIc)`
  width: ?rem;
  cursor: pointer;
`;

const ProducerDefaultModeToggleIcon = styled(ProducerDefaultModeToggleIc)`
  width: ?rem;
  cursor: pointer;
`;

const ProducerModeToggleIcon = styled(ProducerModeToggleIc)`
  width: ?rem;
  cursor: pointer;
`;

const ResendPasswordProducerBtnIcon = styled(ResendPasswordProducerBtnIc)`
  width: ?rem;
  cursor: pointer;
`;

const ResendPasswordVocalBtnIcon = styled(ResendPasswordVocalBtnIc)`
  width: ?rem;
  cursor: pointer;
`;
