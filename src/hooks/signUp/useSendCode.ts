import { useState } from "react";
import { useMutation } from "react-query";
import { authEmail } from "../../api/signup";

export default function useSendCode() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const { mutate: authMail } = useMutation(authEmail, {
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (err) => {
      setIsError(true);
      setError(err);
    },
  });

  return { authMail, error, isError, isSuccess };
}
