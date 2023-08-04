import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import { CHECK_NICKNAME_FORM } from "../../core/signUp/checkForm";
import { NICKNAME_MESSAGE } from "../../core/signUp/errorMessage";
import { NickNameProp } from "../../type/signUp/nickNameProp";
import { checkNicknamForm } from "../../utils/signUp/checkForm";
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
          <InputTitle>
            <p>What’s your name?</p>
            <ImportantIcon>*</ImportantIcon>
          </InputTitle>
          <Input
            name="nickName"
            rules={{
              required: true,
              pattern: {
                value: CHECK_NICKNAME_FORM,
                message: NICKNAME_MESSAGE.ERROR,
              },
              validate: {
                check: (value) => {
                  if (checkNicknamForm(value)) {
                    return NICKNAME_MESSAGE.SUCCESS;
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
    </>
  );
}

const ImportantIcon = styled.i`
  margin-left: 0.47rem;

  color: ${({ theme }) => theme.colors.main};
`;
