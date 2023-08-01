import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SignupEmailPasswordTitleIc } from "../../assets";
import { CHECK_EMAIL_FORM } from "../../core/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import Input from "./Input";

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
          {/* <Input
          type="text"
          {...register("email", {
            pattern: {
              value: CHECK_EMAIL_FORM,
              message: EMAIL_MESSAGE.FORM,
            },
          })}
          placeholder="dfdfdfdfd"
        />
        <ErrorMessage>{errors?.email ? <>{errors.email?.message}</> : null}</ErrorMessage> */}
          {/* <Email /> */}
          <Input
            {...register("email", {
              pattern: {
                value: CHECK_EMAIL_FORM,
                message: EMAIL_MESSAGE.FORM,
              },
              required: true,
            })}
            type="text"
            placeholder="닉네임을 입력해주세요."
          />
          <SubmitButton type="submit" />
        </form>
        {/* <Email emails={emails} setEmails={setEmails} />
      <VerifyCode /> */}
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

// const Input = styled.input`
//   color: white;
//   border-bottom: 1px solid white;

//   width: 45rem;
// `;

const SubmitButton = styled.input`
  color: white;
`;

const ErrorMessage = styled.p`
  margin-top: 1.1rem;
  height: 1.9rem;
`;
