import styled, { css } from "styled-components";
import {
  ForgotPasswordEmailAskIc,
  ForgotPasswordTitleIc,
  InputWarningIc,
  ProducerDefaultModeToggleIc,
  ProducerModeToggleIc,
  RequestResetPasswordDefaultBtnIc,
  RequestResetPasswordProducerBtnIc,
  RequestResetPasswordVocalBtnIc,
  ResendPasswordProducerBtnIc,
  ResendPasswordVocalBtnIc,
} from "../../assets";

import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { postNewPassword } from "../../core/api/newPassword";
import { emailInvalidMessage } from "../../core/userInfoErrorMessage/emailInvalidMessage";
import { ForgotPasswordToken } from "../../recoil/forgotPasswordToken";
import { checkEmailForm } from "../../utils/errorMessage/checkEmailForm";
import Loading from "../@common/loading";

export default function ForgotPasswordInput() {
  const [email, setEmail] = useState<string>("");
  const [isProducerMode, setIsProducerMode] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>("vocal");
  const [resendTrigger, setResendTrigger] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>(emailInvalidMessage.NULL);
  const [recentEmail, setRecentEmail] = useState<string>("");
  const [isSameRecentEmail, setIsSameRecentEmail] = useState<boolean>(true);
  const [forgotPasswordToken, setForgotPasswordToken] = useRecoilState(ForgotPasswordToken);

  const { mutate, isSuccess, isLoading, isError, error } = useMutation(() => postNewPassword(userType, email), {
    onSuccess: (data) => {
      const token = data.data.data.token;
      setForgotPasswordToken(token);
      setIsSameRecentEmail(true);
      setRecentEmail(email);
      alert(
        "Authentication mail sent. Please check your mailbox. \nIf you haven't received the mail, please check your spam mail box.\n인증 메일을 보냈습니다. 메일함을 확인해주세요. \n메일을 받지 못하셨다면 스팸메일함을 확인해주세요.",
      );
    },
    onError: (error: any) => {
      error.response.status === 401 && alert(error.response.data.message);
    },
  });
  useEffect(() => {
    isProducerMode ? setUserType("producer") : setUserType("vocal");
  }, [isProducerMode]);

  useEffect(() => {
    if (isSuccess) {
      setResendTrigger(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    error?.response.status === 401 && setEmailMessage("We don’t have an account with that email address");
  }, [isError]);

  useEffect(() => {
    email === recentEmail ? setIsSameRecentEmail(true) : setIsSameRecentEmail(false);
  }, [email]);

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
  }

  function isInputWarnning() {
    if (
      emailMessage === emailInvalidMessage.FORM ||
      emailMessage === "We don’t have an account with that email address"
    ) {
      return true;
    }

    if (emailMessage === emailInvalidMessage.NULL || emailMessage === emailInvalidMessage.SUCCESS) {
      return false;
    }
  }

  function requestBtnType() {
    if (!checkEmailForm(email)) {
      return <RequestResetPasswordDefaultBtnIcon />;
    } else {
      if (resendTrigger && isSameRecentEmail) {
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
      {isLoading && <Loading />}
      <Wrapper>
        <TitleWrapper>
          <ForgotPasswordTitleIcon />
        </TitleWrapper>
        <InputBox>
          <ForgotPasswordEmailAskIcon />
          <InputWrapper>
            <Input placeholder="Enter your email address" onChange={writeEmail} />
            {isInputWarnning() && <InputWarningIcon />}
          </InputWrapper>
          <UnderLine inputState={emailMessage} />
        </InputBox>
        <>
          {isSameRecentEmail && isInputWarnning() && <WarningMessage>{emailMessage}</WarningMessage>}
          {isInputWarnning() && <WarningMessage>{emailMessage}</WarningMessage>}

          {checkEmailForm(email) && isSameRecentEmail && (
            <ValidTimeMessage isProducerMode={isProducerMode}>Valid time is 3 hours.</ValidTimeMessage>
          )}
        </>
        <ModeWrapper>
          <ModeText>Producer Mode</ModeText>
          {producerToggleType()}
        </ModeWrapper>
        {requestBtnType()}
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

  margin-top: 3rem;
`;

const ForgotPasswordEmailAskIcon = styled(ForgotPasswordEmailAskIc)`
  width: 20.7rem;
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
  width: 100%;
  height: 3rem;

  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.red};
  margin-top: 1.1rem;
`;

const ValidTimeMessage = styled.span<{ isProducerMode: boolean }>`
  width: 100%;
  height: 3rem;

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
    if (
      props.inputState === emailInvalidMessage.FORM ||
      props.inputState === "We don’t have an account with that email address"
    ) {
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
  margin: 1rem 0 3.5rem 0;
`;

const ModeText = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray1};
  margin: 0 1.2rem;
`;

const RequestResetPasswordProducerBtnIcon = styled(RequestResetPasswordProducerBtnIc)`
  width: 56rem;
  cursor: pointer;
`;

const RequestResetPasswordVocalBtnIcon = styled(RequestResetPasswordVocalBtnIc)`
  width: 56rem;
  cursor: pointer;
`;

const ProducerDefaultModeToggleIcon = styled(ProducerDefaultModeToggleIc)`
  width: 5.8rem;
  cursor: pointer;
`;

const ProducerModeToggleIcon = styled(ProducerModeToggleIc)`
  width: 5.8rem;
  cursor: pointer;
`;

const ResendPasswordProducerBtnIcon = styled(ResendPasswordProducerBtnIc)`
  width: 56rem;
  cursor: pointer;
`;

const ResendPasswordVocalBtnIcon = styled(ResendPasswordVocalBtnIc)`
  width: 56rem;
  cursor: pointer;
`;

const InputWarningIcon = styled(InputWarningIc)`
  width: 2.2rem;
  height: 2.2rem;
`;

const RequestResetPasswordDefaultBtnIcon = styled(RequestResetPasswordDefaultBtnIc)`
  width: 56rem;
  cursor: pointer;
`;

const ForgotPasswordTitleIcon = styled(ForgotPasswordTitleIc)`
  width: 27.8rem;
`;
