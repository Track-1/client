import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CreateAPasswordForYourAccountIc, SignupEmailPasswordTitleIc, WeSentYouACodeIc } from "../../assets";
import { VERIFICATION_CODE_MESSAGE } from "../../core/signUp/errorMessage";
import { EmailPasswordInputType } from "../../type/signUp/inputType";
import { checkEmailVerified } from "../../utils/signUp/checkEmailVerified";
import { checkIsResend } from "../../utils/signUp/checkIsResendCode";
import Email from "./email";
import Password from "./password";
import PasswordConfirm from "./passwordConfirm";
import VerifyCode from "./verifyCode";

export default function EmailPassword() {
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
    getValues,
    formState: { errors },
    watch,
  } = methods;

  function checkTitle() {
    if (checkIsResend(errors?.email?.message)) {
      return <WeSentYouACodeIcon />;
    } else {
      if (checkEmailVerified(errors?.email?.message)) {
        return <CreateAPasswordForYourAccountIcon />;
      }
      return <SignupEmailPasswordTitleIcon $isRewrite={checkEmailRewrite()} />;
    }
  }

  function checkEmailRewrite() {
    return (
      errors?.verifyCode?.message === VERIFICATION_CODE_MESSAGE.SUCCESS || checkEmailVerified(errors?.email?.message)
    );
  }

  return (
    <>
      {checkTitle()}
      <Email methods={methods} />
      {checkIsResend(errors?.email?.message) && <VerifyCode methods={methods} />}
      <Password methods={methods} width={56} placeholder="Create a password" />
      {checkEmailRewrite() && <PasswordConfirm methods={methods} width={56} placeholder="Enter a password again" />}
    </>
  );
}

const SignupEmailPasswordTitleIcon = styled(SignupEmailPasswordTitleIc)<{ $isRewrite: boolean }>`
  width: 48.3rem;

  margin: 8rem 0 ${({ $isRewrite }) => ($isRewrite ? 2.8 : 10.3)}rem 0;
`;

const WeSentYouACodeIcon = styled(WeSentYouACodeIc)`
  width: 30.7418rem;

  margin: 8rem 0 2.8rem 0;
`;

const CreateAPasswordForYourAccountIcon = styled(CreateAPasswordForYourAccountIc)`
  width: 55.6rem;

  margin: 8rem 0 2.8rem 0;
`;
