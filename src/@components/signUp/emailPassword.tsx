import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { SignupEmailPasswordTitleIc, WeSentYouACodeIc } from "../../assets";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { signupRole } from "../../recoil/signUp/role";
import { EmailPasswordInputType } from "../../type/signUp/inputType";
import Email from "./email";
import Password from "./password";
import PasswordConfirm from "./passwordConfirm";
import VerifyCode from "./verifyCode";

export default function EmailPassword() {
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const clickRole = useRecoilValue<string>(signupRole);
  const methods = useForm<EmailPasswordInputType>({
    defaultValues: {
      email: "",
      verifyCode: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = methods;

  function checkIsResend() {
    return errors?.email?.message === EMAIL_MESSAGE.TIME;
  }

  function checkEmailVerified() {
    return errors?.email?.message === EMAIL_MESSAGE.VERIFY;
  }

  return (
    <>
      {checkIsResend() ? <WeSentYouACodeIcon /> : <SignupEmailPasswordTitleIcon />}
      <Email methods={methods} />
      {checkIsResend() && <VerifyCode methods={methods} />}
      <Password methods={methods} />
      {checkEmailVerified() && <PasswordConfirm methods={methods} />}
    </>
  );
}

const SignupEmailPasswordTitleIcon = styled(SignupEmailPasswordTitleIc)`
  width: 48.3rem;

  margin: 8rem 0 10.3rem 0;
`;

const WeSentYouACodeIcon = styled(WeSentYouACodeIc)`
  width: 30.7418rem;

  margin: 8rem 0 2.8rem 0;
`;
