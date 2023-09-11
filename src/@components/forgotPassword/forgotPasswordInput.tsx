import { useForm, FormProvider } from "react-hook-form";
import PasswordContainer from "../@common/passwordContainer";
import InputTitle from "../signUp/inputTitle";
import Input from "../signUp/Input";
import { checkEmailForm } from "../../utils/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import styled from "styled-components";
import UserTypeToggle from "./userTypeToggle";
import StandardButton from "../@common/button/standardButton";
import { theme } from "../../style/theme";
import { EmailPasswordInputType } from "../../type/signUp/inputType";
import { useEffect, useState } from "react";

export default function ForgotPasswordInput() {
  const methods = useForm<EmailPasswordInputType>({
    defaultValues: {
      email: "",
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

  const [producerType, setProducerType] = useState(false);
  const [buttonColor, setButtonColor] = useState(theme.colors.gray4);
  const [fontColor, setFontColor] = useState(theme.colors.white);

  function handleChangeUserType() {
    setProducerType((prev) => !prev);
  }

  useEffect(() => {
    if (checkEmailForm(methods.getValues().email)) {
      producerType ? setButtonColor(theme.colors.sub1) : setButtonColor(theme.colors.sub2);
      setFontColor(theme.colors.black);
    } else {
      setButtonColor(theme.colors.gray4);
      setFontColor(theme.colors.white);
    }
  }, [methods.getValues().email, producerType]);

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
      <StandardButton bgColor={buttonColor} fontColor={fontColor} handleClickFunction={() => console.log("hello")}>
        Request a password reset
      </StandardButton>
    </PasswordContainer>
  );
}

const EmailInputWrapper = styled.section`
  display: flex;
  align-items: center;
`;
