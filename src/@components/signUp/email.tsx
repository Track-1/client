import styled from "styled-components";
import { SendCodeSignupIc } from "../../assets";
import { CHECK_EMAIL_FORM } from "../../core/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import Input from "./Input";

interface EmailInput {
  email: string;
}

export default function Email() {
  return (
    <>
      <Input
        name="email"
        rules={{
          required: true,
          pattern: {
            value: CHECK_EMAIL_FORM,
            message: EMAIL_MESSAGE.FORM,
          },
        }}
        title="What's your email?"
        type="text"
        placeholder="Enter your email address"
      />
      <SendCodButton htmlFor="sendCode">
        <SendCodeSignupIcon />
      </SendCodButton>
      <input type="submit" id="sendCode" />
    </>
  );
}

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
