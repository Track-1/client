import { useMutation } from "react-query";
import { postNewPassword } from "../../core/api/newPassword";
import { setCookie } from "../cookie";

export function useSendNewPasswordEmail(tableName: string, userEmail: string) {
  return useMutation(() => postNewPassword(tableName, userEmail), {
    onSuccess: (data) => {
      const token = data.data.data.token;
      setCookie("forgotPasswordToken", token, {});
      //이거 쿠키로 설정하는게 맞는가 찾아보고 다시 코딩해라!
    },
    onError: (error: any) => {
      error.response.status === 401 && alert(error.response.data.message);
    },
  });
}
