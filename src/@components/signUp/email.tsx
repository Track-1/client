import { FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authEmail } from "../../api/signup";
import { SIGNUP_SENDCODE } from "../../core/common/alert/signupSendCode";
import { CHECK_EMAIL_FORM } from "../../core/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import { signupRole } from "../../recoil/signUp/role";
import { SignupInputProps } from "../../type/signUp/inputProps";
import { checkIsResend } from "../../utils/signUp/checkIsResendCode";
import Input from "./Input";
import InputTitle from "./inputTitle";
import SendCodeButton from "./sendCodeButton";

export default function Email(props: SignupInputProps) {
  const { methods } = props;
  const clickRole = useRecoilValue<string>(signupRole);

  const {
    handleSubmit,
    setError,
    resetField,
    getValues,
    formState: { errors },
    watch,
  } = methods;

  function checkIsActive() {
    return (watch("email") !== "" && errors?.email?.message === undefined) || checkIsResend(errors?.email?.message);
  }

  console.log(errors);

  function handleSendCode() {
    // send code post 로직
    console.log("Asdf");
    sendCode({
      tableName: clickRole,
      userEmail: watch("email"),
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
            <SendCodeButton isActive={checkIsActive()} isResend={checkIsResend(errors?.email?.message)} />
          </EmailInputWrapper>
        </form>
      </FormProvider>
    </>
  );
}

const EmailInputWrapper = styled.section`
  display: flex;
  align-items: center;
`;
