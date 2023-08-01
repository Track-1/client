import styled from "styled-components";
import { ResendSignupIc, SendCodeSignupIc } from "../../assets";
import { CHECK_EMAIL_FORM } from "../../core/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import Input from "./Input";

interface EmailProp {
  isSendCode: boolean;
}

export default function Email(props: EmailProp) {
  const { isSendCode } = props;

  return (
    <>
      <InputTitle>What’s your email?</InputTitle>
      <EmailInputWrapper>
        <Input
          name="email"
          rules={{
            required: true,
            pattern: {
              value: CHECK_EMAIL_FORM,
              message: EMAIL_MESSAGE.FORM,
            },
          }}
          type="text"
          placeholder="Enter your email address"
          width={42.2}
        />
        <SendCodButton htmlFor="sendCode">{isSendCode ? <ResendSignupIcon /> : <SendCodeSignupIcon />}</SendCodButton>
        <input type="submit" id="sendCode" />
      </EmailInputWrapper>
    </>
  );
}

const InputTitle = styled.h1`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};
`;

const EmailInputWrapper = styled.section`
  display: flex;
  align-items: center;
`;

const SendCodButton = styled.label`
  height: 4rem;
  margin-left: 1rem;
  padding: 1.5rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray4};
  border-radius: 2.2rem;

  cursor: pointer;
`;

const SendCodeSignupIcon = styled(SendCodeSignupIc)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 9.3761rem;
  height: 0.9906rem;
`;

const ResendSignupIcon = styled(ResendSignupIc)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 6.3393rem;
  height: 0.988rem;
`;
