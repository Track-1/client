import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authEmail } from "../../api/signup";
import { SignupEmailPasswordTitleIc, WeSentYouACodeIc } from "../../assets";
import { SIGNUP_SENDCODE } from "../../core/common/alert/signupSendCode";
import { CHECK_EMAIL_FORM } from "../../core/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import { signupRole } from "../../recoil/signUp/role";
import Input from "./Input";
import InputTitle from "./inputTitle";
import SendCodeButton from "./sendCodeButton";
import VerifyCode from "./verifyCode";

interface EmailInputType {
  email: string;
}

export default function Email() {
  const clickRole = useRecoilValue<string>(signupRole);

  const methods = useForm<EmailInputType>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = methods;

  function checkIsActive() {
    return (watch("email") !== "" && errors?.email?.message === undefined) || checkIsResend();
  }

  function checkIsResend() {
    return errors?.email?.message === EMAIL_MESSAGE.TIME;
  }

  // function showVerifyCodeInput() {
  //   return errors?.email?.message === EMAIL_MESSAGE.ACTIVE;
  // }

  function handleSendCode(data: any) {
    // send code post 로직
    sendCode({
      tableName: clickRole,
      userEmail: data?.email,
    });
  }

  const { mutate: sendCode } = useMutation(authEmail, {
    onSuccess: () => {
      setError("email", { message: EMAIL_MESSAGE.TIME });
      alert(SIGNUP_SENDCODE);
    },
    onError: (error: any) => {
      if (error.response.data.message === "중복된 이메일입니다") {
        setError("email", { message: EMAIL_MESSAGE.DUPLICATION });
      }
    },
  });

  return (
    <>
      <FormProvider {...methods}>
        {checkIsResend() ? <WeSentYouACodeIcon /> : <SignupEmailPasswordTitleIcon />}
        <form onSubmit={handleSubmit(handleSendCode)}>
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
            <SendCodeButton isActive={checkIsActive()} isResend={checkIsResend()} />
          </EmailInputWrapper>
        </form>
      </FormProvider>
      {checkIsResend() && <VerifyCode email={watch("email")} setEmailMessage={setError} />}
    </>
  );
}

const SignupEmailPasswordTitleIcon = styled(SignupEmailPasswordTitleIc)`
  width: 48.3rem;

  margin: 8rem 0 13.4rem 3.4rem;
`;

const WeSentYouACodeIcon = styled(WeSentYouACodeIc)`
  width: 30.7418rem;
  margin: 8rem 0 5.9rem 12rem;
`;

const EmailInputWrapper = styled.section`
  display: flex;
  align-items: center;
`;
