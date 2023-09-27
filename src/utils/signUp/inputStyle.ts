import { ROLE } from "../../core/common/roleType";
import {
  EMAIL_MESSAGE,
  ERROR_COLOR,
  NICKNAME_MESSAGE,
  PASSWORD_MESSAGE,
  VERIFICATION_CODE_MESSAGE,
} from "../../core/signUp/errorMessage";

export function checkInputUnderline(message: string | undefined) {
  switch (message) {
    case EMAIL_MESSAGE.NULL:
      return ERROR_COLOR.GRAY;
    case EMAIL_MESSAGE.FORM:
      return ERROR_COLOR.RED;
    case EMAIL_MESSAGE.DUPLICATION:
      return ERROR_COLOR.RED;
    case EMAIL_MESSAGE.SUCCESS:
      return ERROR_COLOR.WHITE;
    case EMAIL_MESSAGE.VERIFY:
      return ERROR_COLOR.VIOLET;
    case VERIFICATION_CODE_MESSAGE.NULL:
      return ERROR_COLOR.GRAY;
    case VERIFICATION_CODE_MESSAGE.ERROR:
      return ERROR_COLOR.RED;
    case PASSWORD_MESSAGE.NULL:
      return ERROR_COLOR.GRAY;
    case PASSWORD_MESSAGE.FORM:
      return ERROR_COLOR.RED;
    case PASSWORD_MESSAGE.MATCH:
      return ERROR_COLOR.RED;
    case PASSWORD_MESSAGE.SUCCESS:
      return ERROR_COLOR.VIOLET;
    case NICKNAME_MESSAGE.NULL:
      return ERROR_COLOR.GRAY;
    case NICKNAME_MESSAGE.ERROR:
      return ERROR_COLOR.RED;
    case NICKNAME_MESSAGE.SUCCESS:
      return ERROR_COLOR.VIOLET;
    default:
      return ERROR_COLOR.WHITE;
  }
}

export function checkMessageColor(message: string | undefined, userType?: string) {
  switch (message) {
    case EMAIL_MESSAGE.NULL:
      return ERROR_COLOR.TRANSPARENT;
    case EMAIL_MESSAGE.FORM:
      return ERROR_COLOR.RED;
    case EMAIL_MESSAGE.DUPLICATION:
      return ERROR_COLOR.RED;
    case EMAIL_MESSAGE.TIME:
      return userType ? (userType === ROLE.PRODUCER ? ERROR_COLOR.GREEN : ERROR_COLOR.PINK) : ERROR_COLOR.VIOLET;
    case VERIFICATION_CODE_MESSAGE.ERROR:
      return ERROR_COLOR.RED;
    case PASSWORD_MESSAGE.FORM:
      return ERROR_COLOR.RED;
    case PASSWORD_MESSAGE.MATCH:
      return ERROR_COLOR.RED;
    case NICKNAME_MESSAGE.NULL:
      return ERROR_COLOR.TRANSPARENT;
    case NICKNAME_MESSAGE.ERROR:
      return ERROR_COLOR.RED;
    case NICKNAME_MESSAGE.SUCCESS:
      return ERROR_COLOR.TRANSPARENT;
    default:
      return ERROR_COLOR.TRANSPARENT;
  }
}
