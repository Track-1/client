import { FormProvider } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useVerifyCode } from "../../hooks/queries/user";
import { role } from "../../recoil/common/role";
import { SignupInputProps } from "../../type/signUp/inputProps";
import Input from "./Input";
import InputTitle from "./inputTitle";
import VerifyCodeButton from "./verifyCodeButton";

export default function VerifyCode(props: SignupInputProps) {
  const { methods } = props;
  const clickRole = useRecoilValue<string>(role);
  const {
    handleSubmit,
    setError,
    resetField,
    setValue,
    getValues,
    formState: { errors },
    watch,
  } = methods;

  const { verifyCode } = useVerifyCode(setError, resetField, setValue);

  function handleVerifyCode() {
    verifyCode({
      userType: clickRole === "producer" ? "producer" : "vocal",
      userEmail: getValues("email"),
      userCode: getValues("verifyCode"),
    });
  }

  function checkIsActive() {
    return watch("verifyCode") !== "";
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleVerifyCode)}>
        <InputTitle>Verification code</InputTitle>
        <VerifyCodeWrapper>
          <Input name="verifyCode" rules={{}} type="text" placeholder="Verify your email address" width={42.2} />
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
