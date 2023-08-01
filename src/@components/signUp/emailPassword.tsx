import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { authEmail } from "../../api/signup";
import { SignupEmailPasswordTitleIc } from "../../assets";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { signupRole } from "../../recoil/signUp/role";
import Email from "./email";

interface IFormInputs {
  email: string;
}

export default function EmailPassword() {
  const [isSendCode, setIsSendCode] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const [clickRole, setClickRole] = useRecoilState<string>(signupRole);

  const methods = useForm<IFormInputs>({
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
    onSuccess: () => {},
    onError: (error: any) => {
      if (error.response.data.message === "중복된 이메일입니다") {
        setError("email", { message: EMAIL_MESSAGE.DUPLICATION });
      }
    },
  });

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

  margin: 8rem 0 13.4rem 3.4rem;
`;

const EmailPasswordWrapper = styled.div`
  color: white;
`;
