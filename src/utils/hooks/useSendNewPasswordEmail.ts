import { useMutation } from "react-query";
import { postNewPassword } from "../../core/api/newPassword";

export function useSendNewPasswordEmail(tableName: string, userEmail: string) {
  return useMutation(() => postNewPassword(tableName, userEmail), {
    onSuccess: (data) => {
      const token = data.data.data.token;
      window.localStorage.setItem("token", token);
    },
    onError: (error: any) => {
      if (error.response.data.status === 1000) {
        alert(error.response.data.message);
      }
    },
  });
}
