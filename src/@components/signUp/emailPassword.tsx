import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SignupEmailPasswordTitleIc } from "../../assets";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import Email from "./email";

interface IFormInputs {
  email: string;
}

export default function EmailPassword() {
  const [isSendCode, setIsSendCode] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);

  const methods = useForm<IFormInputs>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  function handleSendCode(data: any) {
    // send code post 로직
    console.log("회원가입" + data?.email);
  }

  return (
    <FormProvider {...methods}>
      <EmailPasswordWrapper>
        <SignupEmailPasswordTitleIcon />
        <form onSubmit={handleSubmit(handleSendCode)}>
          <Email />
        </form>
      </EmailPasswordWrapper>
    </FormProvider>
  );
}

const SignupEmailPasswordTitleIcon = styled(SignupEmailPasswordTitleIc)`
  width: 48.3rem;

  margin-top: 8rem;
`;

const EmailPasswordWrapper = styled.div`
  color: white;
`;
