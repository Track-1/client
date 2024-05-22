import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";

export function checkEmailVerifyOKToSuccess(value: string | undefined) {
  return value === EMAIL_MESSAGE.VERIFY;
}
