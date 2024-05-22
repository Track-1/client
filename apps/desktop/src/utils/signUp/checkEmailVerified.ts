import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";

export function checkEmailVerified(value: string | undefined) {
  return value === EMAIL_MESSAGE.VERIFY;
}
