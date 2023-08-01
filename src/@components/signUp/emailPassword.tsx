import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SignupEmailPasswordTitleIc } from "../../assets";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import Email from "./email";

type Inputs = {
  email: string;
  emailRequired: string;
};

interface IFormInputs {
  email: string;
}

export default function EmailPassword() {
  const [isSendCode, setIsSendCode] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  // const [emails, setEmails] = useState<emailInputType>({
  //   email: "",
  //   message: EMAIL_MESSAGE.NULL,
  // });
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  //   control,
  // } = useForm<Inputs>();

  const methods = useForm<IFormInputs>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, register } = methods;

  function hadleSignup(data: any) {
    console.log("회원가입" + data?.email);
  }

  // console.log(watch("email"));

  return (
    <FormProvider {...methods}>
      <EmailPasswordWrapper>
        <SignupEmailPasswordTitleIcon />
        <form onSubmit={handleSubmit(hadleSignup)}>
          <Email />
          <SubmitButton type="submit" />
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

const SubmitButton = styled.input`
  color: white;
`;
