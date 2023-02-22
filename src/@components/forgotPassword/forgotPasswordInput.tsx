import styled, { css } from "styled-components";
import {
  RequestResetPasswordDefaultBtnIc,
  ForgotPasswordTitleIc,
  RequestResetPasswordProducerBtnIc,
  RequestResetPasswordVocalBtnIc,
  ResendPasswordProducerBtnIc,
  ResendPasswordVocalBtnIc,
} from "../../assets";
import { useState } from "react";
import { useMutation } from "react-query";
import { postNewPassword } from "../../core/api/newPassword";

export default function ForgotPasswordInput() {
  const [email, setEmail] = useState<string>("");
  const [isProducerMode, setIsProducerMode] = useState<boolean>(false);

  const { mutate } = useMutation(requestNewPassword, {
    onSuccess(data, variables, context) {
      console.log("성공");
    },
    onError(error, variables, context) {},
  });

  async function requestNewPassword() {
    return await postNewPassword("producer", email);
  }

  function validateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;
    setEmail(email);
  }

  function requestBtnType() {
    if (true) {
      return <RequestResetPasswordDefaultBtnIcon onClick={() => mutate()} />;
    }

    return isProducerMode ? (
      <RequestResetPasswordProducerBtnIcon onClick={() => mutate()} />
    ) : (
      <RequestResetPasswordVocalBtnIcon onClick={() => mutate()} />
    );
  }

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <ForgotPasswordTitleIc />
        </TitleWrapper>
        <InputWrapper>
          <InputTitle>What's your email</InputTitle>
          <Input placeholder="Enter your email address" onChange={validateEmail} />
          <UnderLine />
        </InputWrapper>
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

const InputWrapper = styled.div`
  margin-top: 6.4rem;
`;

const InputTitle = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray2};
`;

const Input = styled.input`
  height: 3.4rem;
  width: 100%;

  margin-top: 2.99rem;

  ${({ theme }) => theme.fonts.comment};
  color: ${({ theme }) => theme.colors.white};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
  border: none;
`;

const UnderLine = styled.hr`
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.gray3};
`;

const RequestBtnWrapper = styled.div`
  margin-top: 2.2rem;
`;

const RequestResetPasswordDefaultBtnIcon = styled(RequestResetPasswordDefaultBtnIc)`
  cursor: pointer;
`;

const RequestResetPasswordProducerBtnIcon = styled(RequestResetPasswordProducerBtnIc)`
  cursor: pointer;
`;

const RequestResetPasswordVocalBtnIcon = styled(RequestResetPasswordVocalBtnIc)`
  cursor: pointer;
`;
