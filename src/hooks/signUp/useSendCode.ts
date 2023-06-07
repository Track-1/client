import { useMutation } from "react-query";
import { authEmail } from "../../api/signup";

export default function useSendCode() {
  const {
    mutate: authMail,
    isError: isSendCodeError,
    error: sendCodeError,
    isSuccess: isSendCodeSuccess,
  } = useMutation(authEmail);

  return { authMail, sendCodeError, isSendCodeError, isSendCodeSuccess };
}
