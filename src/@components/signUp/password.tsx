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

export default function Password(props: SignupInputProps) {
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
          <InputTitle>Password</InputTitle>
          <Input
            name="password"
            rules={{
              // pattern: {
              //   value: CHECK_PASSWORD_FORM,
              //   message: PASSWORD_MESSAGE.FORM,
              // },
              validate: {
                check: (value) => {
                  if (!checkInputEmpty(getValues("passwordConfirm"))) {
                    if (!checkPasswordMatch(getValues("passwordConfirm"), value)) {
                      setError("passwordConfirm", { message: PASSWORD_MESSAGE.MATCH });
                      setIsSuccess(false);
                    } else {
                      if (checkPasswordForm(value)) {
                        setError("passwordConfirm", { message: PASSWORD_MESSAGE.SUCCESS });
                        if (checkEmailVerifyOKToSuccess(errors.email?.message)) {
                          setIsSuccess(true);
                          setUserData({ ...userData, userEmail: getValues("email"), userPw: getValues("password") });
                        }
                      }
                    }
                  }
                  if (checkPasswordForm(value)) {
                    return PASSWORD_MESSAGE.SUCCESS;
                  } else {
                    if (!checkInputEmpty(value)) {
                      return PASSWORD_MESSAGE.FORM;
                    }
                    setIsSuccess(false);

                    //
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
