import PasswordContainer from "../@common/passwordContainer";
import Password from "../signUp/password";
import { EmailPasswordInputType } from "../../type/signUp/inputType";
import { useForm } from "react-hook-form";
import PasswordConfirm from "../signUp/passwordConfirm";
import styled from "styled-components";
import StandardButton from "../@common/button/standardButton";
import { useEffect, useState } from "react";
import { theme } from "../../style/theme";
import { checkPasswordForm } from "../../utils/signUp/checkForm";
import { checkPasswordMatch } from "../../utils/signUp/checkPasswordMatch";
import { usePatchPassword } from "../../hooks/queries/user";
import { UserPasswordType } from "../../type/user";

export default function ResetPasswordInput() {
  const methods = useForm<EmailPasswordInputType>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
    watch,
  } = methods;

  const [buttonColor, setButtonColor] = useState(theme.colors.gray4);

  const { patchPassword, isSuccess } = usePatchPassword();

  useEffect(() => {
    if (
      checkPasswordForm(methods.getValues().password) &&
      checkPasswordMatch(methods.getValues().passwordConfirm, methods.getValues().password)
    ) {
      setButtonColor(theme.colors.main);
    } else {
      setButtonColor(theme.colors.gray4);
    }
  }, [methods.getValues().password, methods.getValues().passwordConfirm]);

  function handlePatchPassword() {
    if (buttonColor === theme.colors.main) {
      const userPassword: UserPasswordType = { userPw: methods.getValues().password };
      patchPassword(userPassword);
    }
  }

  return (
    <PasswordContainer
      height={66.2}
      containerInterval={6.6}
      title="Change your password"
      titleIntervalTop={7.5}
      titleIntervalBottom={2.8}>
      <Password methods={methods} width={56} placeholder="Enter new password" />
      <PasswordConfirm methods={methods} width={56} placeholder="Enter new password again" />
      <Instructions>{`If you save your new password,\n your account will be signed out everywhere`}</Instructions>
      <StandardButton bgColor={buttonColor} fontColor={theme.colors.white} handleClickFunction={handlePatchPassword}>
        save
      </StandardButton>
    </PasswordContainer>
  );
}

const Instructions = styled.p`
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray3};

  margin-top: 6.1rem;
  margin-bottom: 2.3rem;

  text-align: center;
  white-space: pre-line;
`;
