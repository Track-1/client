import { FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { postVerifyCode } from "../../api/signup";
import { EMAIL_MESSAGE, VERIFICATION_CODE_MESSAGE } from "../../core/signUp/errorMessage";
import { signupRole } from "../../recoil/signUp/role";
import { SignupInputProps } from "../../type/signUp/inputProps";
import Input from "./Input";
import InputTitle from "./inputTitle";
import VerifyCodeButton from "./verifyCodeButton";

export default function VerifyCode(props: SignupInputProps) {
  const { methods } = props;
  const clickRole = useRecoilValue<string>(signupRole);
  const {
    handleSubmit,
    setError,
    resetField,
    getValues,
    formState: { errors },
    watch,
  } = methods;

  const { mutate: verifyEmail } = useMutation(postVerifyCode, {
    onSuccess: () => {
      // password 등장 하도록 변경
      setError("email", { message: EMAIL_MESSAGE.VERIFY });
      resetField("verifyCode");
      resetField("passwordConfirm");
    },
    onError: () => {
      setError("verifyCode", { message: VERIFICATION_CODE_MESSAGE.ERROR });
      setError("email", { message: EMAIL_MESSAGE.TIME });
    },
  });

  function handleVerifyCode() {
    //verify code post
    verifyEmail({
      tableName: clickRole,
      userEmail: getValues("email"),
      verificationCode: getValues("verifyCode"),
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
