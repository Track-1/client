import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../Input";
import InputTitle from "../inputTitle";

export default function ContactInput() {
  const methods = useForm({
    defaultValues: {
      userContact: "",
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
