import styled from "styled-components";
import { SendCodeSignupIc } from "../../assets";
import { CHECK_EMAIL_FORM } from "../../core/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import Input from "./Input";

export default function Email() {
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
        <SendCodButton htmlFor="sendCode">
          <SendCodeSignupIcon />
        </SendCodButton>
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
  width: 12.7rem;
  height: 4rem;
  padding: 1.5rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray4};
  border-radius: 2.2rem;

  cursor: pointer;
`;

const SendCodeSignupIcon = styled(SendCodeSignupIc)`
  width: 9.3761rem;
  height: 0.9906rem;
`;
