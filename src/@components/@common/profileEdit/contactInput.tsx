import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import { ProfileEditType } from "../../../type/common/profile";
import Input from "../Input";
import InputTitle from "../inputTitle";

export default function ContactInput(props: ProfileEditType) {
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
            <p>Contact</p>
            <ImportantIcon>*</ImportantIcon>
          </InputTitle>
          <Input
            name="contact"
            rules={{
              required: true,
              // pattern: {
              //   value: CHECK_NICKNAME_FORM,
              //   message: NICKNAME_MESSAGE.ERROR,
              // }
            }}
            type="text"
            placeholder="Enter your phone number or SNS account"
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
