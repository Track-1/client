import { useState } from "react";
import { useMutation } from "react-query";
import { authEmail } from "../../api/signup";

export default function useSendCode() {
  // const { mutate: checkDuplicate } = useMutation(checkEmailDuplication, {
  //   onSuccess: (response) => {
  //     setIsDuplication(response);
  //   },
  //   onError: () => {},
  // });

  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const { mutate: authMail } = useMutation(authEmail, {
    onSuccess: (res) => {
      console.debug(res);
    },
    onError: (err) => {
      setIsError(true);
      setError(err);
    },
  });

  // const { mutate: reAuthMail } = useMutation(repostAuthEmail, {
  //   onSuccess: () => {},
  //   onError: () => {},
  // });

  return { authMail, error, isError };
}
