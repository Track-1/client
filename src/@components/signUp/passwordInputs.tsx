import { FormProvider, useForm } from "react-hook-form";
import Password from "./password";
import PasswordConfirm from "./passwordConfirm";

interface PasswordInputType {
  password: string;
  passwordConfirm: string;
}

export default function PasswordInputs() {
  const methods = useForm<PasswordInputType>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = methods;

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <Password />
          <PasswordConfirm />
        </form>
      </FormProvider>
    </>
  );
}
