import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { CHECK_PASSWORD_FORM } from "../../core/signUp/checkForm";
import { PASSWORD_MESSAGE } from "../../core/signUp/errorMessage";
import { SignupInputProps } from "../../type/signUp/inputProps";
import { showPassword } from "../../utils/signUp/showPassword";
import Input from "./Input";
import InputTitle from "./inputTitle";
import PasswordShowIcons from "./passwordShowIcons";

export default function Password(props: SignupInputProps) {
  const { methods } = props;
  const {
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = methods;
  const [isShow, setIsShow] = useState(false);

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
          <PasswordShowIcons isShow={isShow} setIsShow={setIsShow} />
        </form>
      </FormProvider>
    </>
  );
}
