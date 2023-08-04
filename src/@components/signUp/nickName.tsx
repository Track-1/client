import { FormProvider } from "react-hook-form";
import { CHECK_NICKNAME_FORM } from "../../core/signUp/checkForm";
import { NICKNAME_MESSAGE } from "../../core/signUp/errorMessage";
import { NickNameProp } from "../../type/signUp/nickNameProp";
import Input from "./Input";
import InputTitle from "./inputTitle";

export default function NickName(props: NickNameProp) {
  const { methods } = props;

  const {
    handleSubmit,
    setError,
    resetField,
    getValues,
    formState: { errors },
    watch,
  } = methods;

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <InputTitle>What’s your name?*</InputTitle>
          <Input
            name="nickName"
            rules={{
              required: true,
              pattern: {
                value: CHECK_NICKNAME_FORM,
                message: NICKNAME_MESSAGE.ERROR,
              },
              validate: {},
            }}
            type="text"
            placeholder="Enter your user name"
            width={56}
          />
        </form>
      </FormProvider>
    </>
  );
}
