import { FormProvider } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import { useUserEmail } from "../../hooks/queries/user";
import { role } from "../../recoil/common/role";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { SignupInputProps } from "../../type/signUp/inputProps";
import { checkEmailForm } from "../../utils/signUp/checkForm";
import { checkIsResend } from "../../utils/signUp/checkIsResendCode";
import Input from "./Input";
import InputTitle from "./inputTitle";
import SendCodeButton from "./sendCodeButton";

export default function Email(props: SignupInputProps) {
  const { methods } = props;
  const clickRole = useRecoilValue<string>(role);
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);

  const {
    handleSubmit,
    setError,
    resetField,
    getValues,
    formState: { errors },
    watch,
  } = methods;

  const { sendEmail } = useUserEmail();

  function checkIsActive() {
    return (getValues("email") !== "" && errors?.email?.message === undefined) || checkIsResend(errors?.email?.message);
  }

  function handleSendCode() {
    sendEmail({
      userType: clickRole === "producer" ? "producer" : "vocal",
      userEmail: getValues("email"),
    });
  }

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
                validate: {
                  check: (value) => {
                    resetField("password");
                    resetField("passwordConfirm");
                    if (!checkEmailForm(value)) {
                      return EMAIL_MESSAGE.FORM;
                    } else {
                      setIsSuccess(false);
                    }
                  },
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
