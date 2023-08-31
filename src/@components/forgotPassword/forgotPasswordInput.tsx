import { FormProvider } from "react-hook-form";
import PasswordContainer from "../@common/passwordContainer";
import InputTitle from "../signUp/inputTitle";
import Input from "../signUp/Input";
import { checkEmailForm } from "../../utils/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import styled from "styled-components";
import UserTypeToggle from "./userTypeToggle";
import useForgotPasswordData from "../../hooks/forgotPassword/useForgotPasswordData";
import StandardButton from "../@common/button/standardButton";
import { theme } from "../../style/theme";
import { useForm } from "react-hook-form";
import { EmailPasswordInputType } from "../../type/signUp/inputType";

export default function ForgotPasswordInput() {
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

  const { producerType, handleChangeUserType } = useForgotPasswordData();

  return (
    <PasswordContainer containerInterval={15.1} title="Forgot password?" titleInterval={9.1}>
      <FormProvider {...methods}>
        <form>
          <InputTitle>What’s your email?</InputTitle>
          <EmailInputWrapper>
            <Input
              name="email"
              rules={{
                required: true,
                // pattern: {
                //   value: CHECK_EMAIL_FORM,
                //   message: EMAIL_MESSAGE.FORM,
                // },
                validate: {
                  check: (value) => {
                    if (!checkEmailForm(value)) {
                      return EMAIL_MESSAGE.FORM;
                    }
                  },
                },
              }}
              type="text"
              placeholder="Enter your email address"
              width={55.9}
            />
          </EmailInputWrapper>
        </form>
      </FormProvider>
      <UserTypeToggle producerType={producerType} handleChangeUserType={handleChangeUserType} />
      <StandardButton
        bgColor={theme.colors.gray2}
        fontColor={theme.colors.white}
        handleClickFunction={() => console.log("hello")}>
        Request a password reset
      </StandardButton>
    </PasswordContainer>
  );
}

const EmailInputWrapper = styled.section`
  display: flex;
  align-items: center;
`;
