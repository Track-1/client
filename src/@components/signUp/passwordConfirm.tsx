import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import { ShowPasswordSignupIc, UnshowPasswordSignupIc } from "../../assets";
import { PASSWORD_MESSAGE } from "../../core/signUp/errorMessage";
import { SignupInputProps } from "../../type/signUp/inputProps";
import { showPassword } from "../../utils/signUp/showPassword";
import Input from "./Input";
import InputTitle from "./inputTitle";
import PasswordShowIcons from "./passwordShowIcons";

export default function PasswordConfirm(props: SignupInputProps) {
  const { methods } = props;
  const {
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = methods;
  const [isShow, setIsShow] = useState(false);

  function checkPasswordMatch() {
    return watch("password") === watch("passwordConfirm");
  }

  useEffect(() => {
    if (!checkPasswordMatch() && watch("passwordConfirm")) {
      setError("passwordConfirm", { message: PASSWORD_MESSAGE.MATCH });
    }
  }, [watch("passwordConfirm")]);

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <InputTitle>Password Confirm</InputTitle>
          <Input
            name="passwordConfirm"
            rules={{
              required: true,
            }}
            type={showPassword(isShow)}
            placeholder="Enter a password again"
            width={56}
          />
          <PasswordShowIcons isShow={isShow} setIsShow={setIsShow} />
        </form>
      </FormProvider>
    </>
  );
}

const EyeWrapper = styled.i`
  margin: -7.5rem 0 0 52rem;
  position: absolute;

  cursor: pointer;
`;

const ShowPasswordSignupIcon = styled(ShowPasswordSignupIc)`
  width: 4rem;
  height: 4rem;
`;

const UnshowPasswordSignupIcon = styled(UnshowPasswordSignupIc)`
  width: 4rem;
  height: 4rem;
`;
