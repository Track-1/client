import { EMAIL_MESSAGE } from "../../core/signUp/errorMessage";

export function checkIsResend(message: string | undefined) {
  return message === EMAIL_MESSAGE.TIME;
}
