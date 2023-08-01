import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "./Input";
import InputTitle from "./inputTitle";
import VerifyCodeButton from "./verifyCodeButton";

interface VerifyCodeType {
  verifyCode: string;
}

export default function VerifyCode() {
  const methods = useForm<VerifyCodeType>({
    defaultValues: {
      verifyCode: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = methods;

  function handleVerifyCode() {}

  function checkIsActive() {
    return true;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleVerifyCode)}>
        <InputTitle>Verification code</InputTitle>
        <VerifyCodeWrapper>
          <Input
            name="verifyCode"
            rules={{
              required: true,
            }}
            type="text"
            placeholder="Verify your email address"
            width={42.2}
          />
          <VerifyCodeButton isActive={checkIsActive()} />
        </VerifyCodeWrapper>
      </form>
    </FormProvider>
  );
}

const VerifyCodeWrapper = styled.section`
  display: flex;
  align-items: center;
`;
