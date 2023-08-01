import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { authEmail } from "../../api/signup";
import { ResendSignupIc, SendCodeSignupIc, SignupEmailPasswordTitleIc, WeSentYouACodeIc } from "../../assets";
import { CHECK_EMAIL_FORM } from "../../core/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import { signupRole } from "../../recoil/signUp/role";
import Input from "./Input";

interface EmailInputType {
  email: string;
}

export default function Email() {
  const [isSendCode, setIsSendCode] = useState<boolean>(false);
  // const [emailMessage, setEmailMessage] = useState<string>(EMAIL_MESSAGE.NULL);
  const [clickRole, setClickRole] = useRecoilState<string>(signupRole);

  const methods = useForm<EmailInputType>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, setError } = methods;

  function handleSendCode(data: any) {
    // send code post 로직
    sendCode({
      tableName: clickRole,
      userEmail: data?.email,
    });

    // console.log("회원가입" + data?.email);
  }

  const { mutate: sendCode } = useMutation(authEmail, {
    onSuccess: () => {
      setError("email", { message: EMAIL_MESSAGE.TIME });
    },
    onError: (error: any) => {
      if (error.response.data.message === "중복된 이메일입니다") {
        setError("email", { message: EMAIL_MESSAGE.DUPLICATION });
      }
    },
  });

  return (
    <FormProvider {...methods}>
      {isSendCode ? <WeSentYouACodeIcon /> : <SignupEmailPasswordTitleIcon />}
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
          <SendCodButton htmlFor="sendCode">{isSendCode ? <ResendSignupIcon /> : <SendCodeSignupIcon />}</SendCodButton>
          <input type="submit" id="sendCode" />
        </EmailInputWrapper>
      </form>
    </FormProvider>
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

const InputTitle = styled.h1`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};
`;

const EmailInputWrapper = styled.section`
  display: flex;
  align-items: center;
`;

const SendCodButton = styled.label`
  height: 4rem;
  margin-left: 1rem;
  padding: 1.5rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray4};
  border-radius: 2.2rem;

  cursor: pointer;
`;

const SendCodeSignupIcon = styled(SendCodeSignupIc)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 9.3761rem;
  height: 0.9906rem;
`;

const ResendSignupIcon = styled(ResendSignupIc)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 6.3393rem;
  height: 0.988rem;
`;
