import { useMutation } from "react-query";
import { postNewPassword } from "../../core/api/newPassword";
import { setCookie } from "../cookie";

export function useSendNewPasswordEmail(tableName: string, userEmail: string) {
  return useMutation(() => postNewPassword(tableName, userEmail), {
    onSuccess: (data) => {
      const token = data.data.data.token;
      setCookie("forgotPasswordToken", token, {});
    },
    onError: (error: any) => {
      alert(error.response.data.message);
    },
  });
}
