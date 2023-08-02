import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useRecoilState } from "recoil";
import { PASSWORD_MESSAGE } from "../../core/signUp/errorMessage";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { SignupInputProps } from "../../type/signUp/inputProps";
import { showPassword } from "../../utils/signUp/showPassword";
import Input from "./Input";
import InputTitle from "./inputTitle";
import PasswordShowIcons from "./passwordShowIcons";

export default function PasswordConfirm(props: SignupInputProps) {
  const { methods } = props;
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);

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
          <InputTitle>Password Confirm</InputTitle>
          <Input
            name="passwordConfirm"
            rules={{
              required: true,
              validate: {
                check: (val) => {
                  if (watch("password")) {
                    if (watch("password") !== val) {
                      return PASSWORD_MESSAGE.MATCH;
                    } else {
                      setIsSuccess(true);
                    }
                  }
                },
              },
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
