import { FormProvider } from "react-hook-form";
import { CHECK_PASSWORD_FORM } from "../../core/signUp/checkForm";
import { PASSWORD_MESSAGE } from "../../core/signUp/errorMessage";
import { SignupInputProps } from "../../type/signUp/inputProps";
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
            type="password"
            placeholder="Create a password"
            width={56}
          />
        </form>
      </FormProvider>
    </>
  );
}
