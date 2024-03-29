import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { RequestBlackTextIc, RequestWhiteTextIc, ResendTextIc } from "../../assets";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import { useResetPassword } from "../../hooks/queries/user";
import { theme } from "../../style/theme";
import { UserType } from "../../type/common/userType";
import { EmailPasswordInputType } from "../../type/signUp/inputType";
import { Switch } from "../@common/switch";
import { FormContainer, InputContainer100, InputTitle } from "../@common/styledComponents";
import { RequestPasswordButtonType } from "../../type/user";
import { CHECK_EMAIL_FORM } from "../../core/signUp/checkForm";

export default function ForgotPasswordInput() {
  const methods = useForm({
    defaultValues: {
      email: "",
    },
  });
  const {
    register,
    setError,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = methods;

  const { data, resetPassword } = useResetPassword(setError);

  const [userType, setUserType] = useState<UserType>("vocal");
  const [buttonType, setButtonType] = useState<RequestPasswordButtonType>({
    isActive: false,
    text: "Request a password reset",
  });

  function handleRequestResetPassword(email: string) {
    resetPassword({ userType: userType, userEmail: email });
  }

  function switchUseryType() {
    userType === "producer" ? setUserType("vocal") : setUserType("producer");
  }

  useEffect(() => {
    if (data?.success) {
      setButtonType({ isActive: true, text: "Resend" });
    }

    if (isDirty && isValid) {
      setButtonType({ isActive: true, text: "Request a password reset" });
    }
  }, [data, isDirty, isValid]);

  return (
    <PasswordContainer>
      <form
        onSubmit={handleSubmit((data) => {
          handleRequestResetPassword(data.email);
        })}>
        <FormTitle>Forgot password?</FormTitle>
        <InputContainer100>
          <div>
            <InputTitle>What’s your email?</InputTitle>
            <EmailInputWrapper>
              <EmailInput
                placeholder="Enter your email address"
                {...register("email", {
                  pattern: {
                    value: CHECK_EMAIL_FORM,
                    message: EMAIL_MESSAGE.FORM,
                  },
                })}
              />
            </EmailInputWrapper>
          </div>
        </InputContainer100>
        <SwitchContainer>
          <Switch externalState={switchUseryType}>
            <Switch.Label onLabel="Producer Mode" offLabel="Producer Mode" />
            <Switch.Root>
              <Switch.Thumb />
            </Switch.Root>
          </Switch>
        </SwitchContainer>
        <SendButton userType={userType} isActive={buttonType.isActive} type="submit">
          {buttonType.isActive ? (
            buttonType.text === "Resend" ? (
              <ResendTextIcon />
            ) : (
              <RequestBlackTextIcon />
            )
          ) : (
            <RequestWhiteTextIcon />
          )}
        </SendButton>
      </form>
    </PasswordContainer>
  );
}

const PasswordContainer = styled(FormContainer)`
  height: 49.6rem;
  margin-top: 15.1rem;
`;

const FormTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.box_title};

  margin-top: 9.1rem;
  margin-bottom: 6.4rem;
`;

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

const SendButton = styled.button<{ userType: UserType; isActive: boolean }>`
  ${theme.fonts.body1};

  display: flex;
  justify-content: center;
  align-items: center;

  width: 55.9rem;
  height: 6.7rem;

  border-radius: 3.35rem;

  ${({ userType, isActive }) =>
    userType === "producer" &&
    (isActive
      ? css`
          color: ${({ theme }) => theme.colors.white};
          background-color: ${({ theme }) => theme.colors.sub1};
        `
      : css`
          color: ${({ theme }) => theme.colors.black};
          background-color: ${({ theme }) => theme.colors.gray4};
        `)}

  ${({ userType, isActive }) =>
    userType === "vocal" &&
    (isActive
      ? css`
          color: ${({ theme }) => theme.colors.white};
          background-color: ${({ theme }) => theme.colors.sub2};
        `
      : css`
          color: ${({ theme }) => theme.colors.black};
          background-color: ${({ theme }) => theme.colors.gray4};
        `)}
`;

const EmailInput = styled.input`
  padding: 0.5rem 0;

  color: white;

  border-bottom: 1px solid ${({ color }) => color};

  width: 55.9rem;

  ${({ theme }) => theme.fonts.input}
`;

const ErrorMessage = styled.h1`
  margin-top: 1.1rem;
  height: 1.9rem;

  color: ${({ theme }) => theme.colors.red};
  ${({ theme }) => theme.fonts.message};
`;

const SwitchContainer = styled.div`
  width: 55.9rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 1.8rem;
  margin-bottom: 3.1rem;
`;
