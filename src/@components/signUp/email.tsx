import { CHECK_EMAIL_FORM } from "../../core/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import Input from "./Input";

type Inputs = {
  email: string;
  emailRequired: string;
};

export default function Email() {
  // const { register } = useForm<Inputs>();

  return (
    <>
      <Input
        name="email"
        rules={{
          required: true,
          pattern: {
            value: CHECK_EMAIL_FORM,
            message: EMAIL_MESSAGE.FORM,
          },
        }}
        title="What's your email?"
        type="text"
        placeholder="Enter your email address"
      />
    </>
  );
}
