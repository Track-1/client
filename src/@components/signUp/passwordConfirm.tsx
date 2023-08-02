import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { PASSWORD_MESSAGE } from "../../core/signUp/errorMessage";
import { SignupInputProps } from "../../type/signUp/inputProps";
import Input from "./Input";
import InputTitle from "./inputTitle";

export default function PasswordConfirm(props: SignupInputProps) {
  const { methods } = props;

  const {
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = methods;

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
            type="password"
            placeholder="Enter a password again"
            width={56}
          />
        </form>
      </FormProvider>
    </>
  );
}
