import { FormProvider } from "react-hook-form";
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

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <InputTitle>Password Confirm</InputTitle>
          <Input
            name="passwordConfirm"
            rules={{
              required: true,
              //   pattern: {
              //     value: checkPasswordMatch(),
              //     message: PASSWORD_MESSAGE.MATCH,
              //   },
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
