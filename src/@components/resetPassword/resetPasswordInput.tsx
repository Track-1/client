import PasswordContainer from "../@common/passwordContainer";
import Password from "../signUp/password";
import { EmailPasswordInputType } from "../../type/signUp/inputType";
import { useForm } from "react-hook-form";
import PasswordConfirm from "../signUp/passwordConfirm";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { theme } from "../../style/theme";
import { checkPasswordForm } from "../../utils/signUp/checkForm";
import { checkPasswordMatch } from "../../utils/signUp/checkPasswordMatch";
import { usePatchPassword } from "../../hooks/queries/user";
import { UserPasswordType } from "../../type/user";
import { UploadWideActiveSaveButtonIc, UploadWideUnActiveSaveButtonIc } from "../../assets";

export default function ResetPasswordInput() {
  const methods = useForm<EmailPasswordInputType>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  const [buttonColor, setButtonColor] = useState(theme.colors.gray4);

  const { patchPassword } = usePatchPassword();

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

  function isActive() {
    return (
      checkPasswordForm(methods.getValues().password) &&
      checkPasswordMatch(methods.getValues().passwordConfirm, methods.getValues().password)
    );
  }

  function handlePatchPassword() {
    if (isActive()) {
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
      {isActive() ? (
        <UploadWideActiveSaveButtonIcon onClick={handlePatchPassword} />
      ) : (
        <UploadWideUnActiveSaveButtonIcon />
      )}
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

const UploadWideActiveSaveButtonIcon = styled(UploadWideActiveSaveButtonIc)`
  width: 55.9rem;

  cursor: pointer;
`;

const UploadWideUnActiveSaveButtonIcon = styled(UploadWideUnActiveSaveButtonIc)`
  width: 55.9rem;

  cursor: pointer;
`;
