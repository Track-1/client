import { useMutation } from "react-query";
import { postVerifyCode } from "../../api/signup";

export default function useVerifyCode() {
  const {
    mutate: verifyCode,
    isError: isVerifyError,
    error: verifyError,
    isSuccess: isVerifySuccess,
  } = useMutation(postVerifyCode);

  return { verifyCode, isVerifyError, verifyError, isVerifySuccess };
}
