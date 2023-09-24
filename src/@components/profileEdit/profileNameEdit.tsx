import { FormProvider } from "react-hook-form";
import InputContainer from "../@common/inputContainer";
import Input from "../signUp/Input";
import { checkNicknamForm } from "../../utils/signUp/checkForm";
import { NICKNAME_MESSAGE } from "../../core/signUp/errorMessage";
import { NickNameProp } from "../../type/signUp/nickNameProp";

export default function ProfileNameEdit(props: NickNameProp) {
  const { methods } = props;

  return (
    <InputContainer title="Name" isRequired>
      <FormProvider {...methods}>
        <form>
          <Input
            name="nickName"
            rules={{
              required: true,
              // pattern: {
              //   value: CHECK_NICKNAME_FORM,
              //   message: NICKNAME_MESSAGE.ERROR,
              // },
              validate: {
                check: (value) => {
                  if (checkNicknamForm(value)) {
                    return NICKNAME_MESSAGE.SUCCESS;
                  } else {
                    return NICKNAME_MESSAGE.ERROR;
                  }
                },
              },
            }}
            type="text"
            placeholder="Enter your user name"
            width={56}
          />
        </form>
      </FormProvider>
    </InputContainer>
  );
}
