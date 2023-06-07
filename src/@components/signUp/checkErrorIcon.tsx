import styled from "styled-components";
import { SignupErrorIc, SignupVerifyIc } from "../../assets";
import { EMAIL_MESSAGE, PASSWORD_MESSAGE, VERIFICATION_CODE_MESSAGE } from "../../core/signUp/errorMessage";

export default function CheckErrorIcon(message: string) {
  switch (message) {
    case EMAIL_MESSAGE.FORM:
      return <SignUpErrorIcon />;
    case EMAIL_MESSAGE.DUPLICATION:
      return <SignUpErrorIcon />;
    case VERIFICATION_CODE_MESSAGE.ERROR:
      return <SignUpErrorIcon />;
    case PASSWORD_MESSAGE.FORM:
      return <SignUpErrorIcon />;
    case PASSWORD_MESSAGE.MATCH:
      return <SignUpErrorIcon />;
    case EMAIL_MESSAGE.VERIFY:
      return <SignUpVerifyIcon />;
    case PASSWORD_MESSAGE.SUCCESS:
      return <SignUpVerifyIcon />;
    case EMAIL_MESSAGE.SUCCESS:
      return;
    default:
      return;
  }
}

const SignUpErrorIcon = styled(SignupErrorIc)`
  width: 4rem;
  height: 4rem;
`;

const SignUpVerifyIcon = styled(SignupVerifyIc)`
  width: 4rem;
  height: 4rem;
`;
