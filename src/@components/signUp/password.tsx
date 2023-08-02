import { useState } from "react";
import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import { ShowPasswordSignupIc, UnshowPasswordSignupIc } from "../../assets";
import { CHECK_PASSWORD_FORM } from "../../core/signUp/checkForm";
import { PASSWORD_MESSAGE } from "../../core/signUp/errorMessage";
import { SignupInputProps } from "../../type/signUp/inputProps";
import { showPassword } from "../../utils/signUp/showPassword";
import Input from "./Input";
import InputTitle from "./inputTitle";

export default function Password(props: SignupInputProps) {
  const { methods } = props;
  const {
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = methods;
  const [isShow, setIsShow] = useState(false);

  function handleShowPassword() {
    setIsShow(!isShow);
  }

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <InputTitle>Password</InputTitle>
          <Input
            name="password"
            rules={{
              required: false,
              pattern: {
                value: CHECK_PASSWORD_FORM,
                message: PASSWORD_MESSAGE.FORM,
              },
            }}
            type={showPassword(isShow)}
            placeholder="Create a password"
            width={56}
          />
          <EyeWrapper onClick={handleShowPassword}>
            {isShow ? <ShowPasswordSignupIcon /> : <UnshowPasswordSignupIcon />}
          </EyeWrapper>
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
