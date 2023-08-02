import Input from "./Input";
import InputTitle from "./inputTitle";

export default function PasswordConfirm() {
  return (
    <>
      <InputTitle>Password Confirm</InputTitle>
      <Input
        name="passwordConfirm"
        rules={{
          required: true,
          //   pattern: {
          //     value: CHECK_PASSWORD_FORM,
          //     message: PASSWORD_MESSAGE.FORM,
          //   },
        }}
        type="password"
        placeholder="Enter a password again"
        width={42.2}
      />
    </>
  );
}
