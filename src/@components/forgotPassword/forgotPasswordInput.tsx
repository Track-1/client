import { useForm, FormProvider } from "react-hook-form";
import PasswordContainer from "../@common/passwordContainer";
import Input from "../signUp/Input";
import { checkEmailForm } from "../../utils/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import styled from "styled-components";
import UserTypeToggle from "./userTypeToggle";
import StandardButton from "../@common/button/standardButton";
import { theme } from "../../style/theme";
import { EmailPasswordInputType } from "../../type/signUp/inputType";
import { useEffect, useState } from "react";
import { useResetPassword } from "../../hooks/queries/user";
import { UserEmailRequest } from "../../type/api";
import { RequestBlackTextIc, RequestWhiteTextIc, ResendTextIc } from "../../assets";
import { ROLE } from "../../core/common/roleType";
import InputContainer from "../@common/inputContainer";

export default function ForgotPasswordInput() {
  const methods = useForm<EmailPasswordInputType>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const { setError } = methods;

  const { data, resetPassword } = useResetPassword(setError);

  const [producerType, setProducerType] = useState(false);
  const [buttonColor, setButtonColor] = useState(theme.colors.gray4);
  const [fontColor, setFontColor] = useState(theme.colors.white);
  const [prevState, setPrevState] = useState({ email: "", producerType: false });
  const [buttonMessageType, setButtonMessageType] = useState("white");

  useEffect(() => {
    if (data?.success) {
      setButtonMessageType("resend");
      setPrevState((prev) => ({
        ...prev,
        email: methods.watch().email,
        producerType: producerType,
      }));
    }
  }, [data]);

  useEffect(() => {
    if (checkEmailForm(methods.getValues().email)) {
      producerType ? setButtonColor(theme.colors.sub1) : setButtonColor(theme.colors.sub2);
      setFontColor(theme.colors.black);
      prevState.email && checkPrevState() ? setButtonMessageType("resend") : setButtonMessageType("black");
    } else {
      setButtonColor(theme.colors.gray4);
      setButtonMessageType("white");
      setFontColor(theme.colors.white);
    }
  }, [methods.watch().email, producerType]);

  function checkPrevState() {
    return prevState.email === methods.watch().email && prevState.producerType === producerType;
  }

  function handleChangeUserType() {
    setProducerType((prev) => !prev);
  }

  function requestResetPassword() {
    const userEmail: UserEmailRequest = {
      userType: producerType ? "producer" : "vocal",
      userEmail: methods.getValues().email,
    };
    resetPassword(userEmail);
  }

  return (
    <PasswordContainer
      height={49.6}
      containerInterval={15.1}
      title="Forgot password?"
      titleIntervalTop={9.1}
      titleIntervalBottom={6.4}>
      <FormProvider {...methods}>
        <InputContainer title="What’s your email?">
          <form>
            <EmailInputWrapper>
              <Input
                name="email"
                rules={{
                  required: true,
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
                userType={producerType ? ROLE.PRODUCER : ROLE.VOCAL}
              />
            </EmailInputWrapper>
          </form>
        </InputContainer>
      </FormProvider>
      <UserTypeToggle producerType={producerType} handleChangeUserType={handleChangeUserType} />

      <StandardButton bgColor={buttonColor} fontColor={fontColor} handleClickFunction={requestResetPassword}>
        {buttonMessageType === "resend" ? (
          <ResendTextIcon />
        ) : buttonMessageType === "black" ? (
          <RequestBlackTextIcon />
        ) : (
          <RequestWhiteTextIcon />
        )}
      </StandardButton>
    </PasswordContainer>
  );
}

const EmailInputWrapper = styled.section`
  display: flex;
  align-items: center;
`;

const RequestBlackTextIcon = styled(RequestBlackTextIc)`
  width: 42.2rem;
`;

const RequestWhiteTextIcon = styled(RequestWhiteTextIc)`
  width: 42.2rem;
`;

const ResendTextIcon = styled(ResendTextIc)`
  width: 11.6rem;
`;
