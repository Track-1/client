import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useRecoilState } from "recoil";
import { PASSWORD_MESSAGE } from "../../core/signUp/errorMessage";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { joinUserData } from "../../recoil/signUp/joinUserData";
import { SignupInputProps } from "../../type/signUp/inputProps";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";
import { checkEmailVerifyOKToSuccess } from "../../utils/signUp/checkEmailVerifyOKToSuccess";
import { checkPasswordForm } from "../../utils/signUp/checkForm";
import { checkInputEmpty } from "../../utils/signUp/checkInputEmpty";
import { checkPasswordMatch } from "../../utils/signUp/checkPasswordMatch";
import { showPassword } from "../../utils/signUp/showPassword";
import Input from "./Input";
import InputTitle from "./inputTitle";
import PasswordShowIcons from "./passwordShowIcons";

export default function PasswordConfirm(props: SignupInputProps) {
  const { methods, width, placeholder } = props;
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const [userData, setUserData] = useRecoilState<JoinUserDataPropsType>(joinUserData);

  const {
    handleSubmit,
    setError,
    getValues,
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
              validate: {
                check: (value) => {
                  if (!checkInputEmpty(value)) {
                    if (!checkPasswordMatch(getValues("password"), value)) {
                      setIsSuccess(false);
                      return PASSWORD_MESSAGE.MATCH;
                    } else {
                      if (checkPasswordForm(getValues("password"))) {
                        if (checkEmailVerifyOKToSuccess(errors.email?.message)) {
                          setIsSuccess(true);
                          setUserData({ ...userData, userEmail: getValues("email"), userPw: getValues("password") });
                        }
                        return PASSWORD_MESSAGE.SUCCESS;
                      }
                    }
                  }
                },
              },
            }}
            type={showPassword(isShow)}
            placeholder={placeholder}
            width={width}
          />
          <PasswordShowIcons isShow={isShow} setIsShow={setIsShow} />
        </form>
      </FormProvider>
    </>
  );
}
