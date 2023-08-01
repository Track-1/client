import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CHECK_EMAIL_FORM } from "../../core/signUp/checkForm";
import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";
import useEmailPasswordInput from "../../hooks/signUp/useEmailPasswordInput";
// import Input from "./Input";

type Inputs = {
  email: string;
  emailRequired: string;
};

export default function Email({ control }: any) {
  const { emailData, setEmailData } = useEmailPasswordInput();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // console.log(watch("email"));

  return (
    // <Input
    //   type="text"
    //   title="What’s your email?"
    //   placeholder="Enter your email address"
    //   errorMessage={emailData?.message}
    //   isButtonExist={true}
    // />

    <>
      <Input
        type="text"
        {...register("email", {
          pattern: {
            value: CHECK_EMAIL_FORM,
            message: EMAIL_MESSAGE.FORM,
          },
        })}
        placeholder="dfdfdfdfd"
      />
      <ErrorMessage>{errors?.email ? <>{errors.email?.message}</> : null}</ErrorMessage>
    </>
  );
}

const Input = styled.input`
  color: white;
  border-bottom: 1px solid white;

  width: 45rem;
`;

const ErrorMessage = styled.p`
  margin-top: 1.1rem;
  height: 1.9rem;
`;
