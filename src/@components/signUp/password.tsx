import { CHECK_PASSWORD_FORM } from "../../core/signUp/checkForm";
import { PASSWORD_MESSAGE } from "../../core/signUp/errorMessage";
import Input from "./Input";
import InputTitle from "./inputTitle";

export default function Password() {
  return (
    <>
      <InputTitle>Password</InputTitle>
      <Input
        name="password"
        rules={{
          required: true,
          pattern: {
            value: CHECK_PASSWORD_FORM,
            message: PASSWORD_MESSAGE.FORM,
          },
        }}
        type="password"
        placeholder="Create a password"
        width={42.2}
      />
    </>
  );
}
