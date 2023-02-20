import { SignUpErrorIc, SignUpVerifyIc } from "../../assets";
import { emailInvalidMessage } from "../../core/userInfoErrorMessage/emailErrorMessage";

export function checkEmailForm(email:string) {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}

export function setEmailInputUnderline(emailErrorMessage:string){ 
    switch (emailErrorMessage) {
        case emailInvalidMessage.NULL:
          return "#535559"
        case emailInvalidMessage.FORM:
            return "#FF4F4F";
            case emailInvalidMessage.DUPLICATION:
          return "#FF4F4F";
        case emailInvalidMessage.VERIFY:
            return "#5200FF";
        default:
            return "white"
        }
}

export function setEmailMessageColor(emailErrorMessage:string){ 
    switch (emailErrorMessage) {
        case emailInvalidMessage.NULL:
          return "transparent"
        case emailInvalidMessage.FORM:
            return "#FF4F4F";
            case emailInvalidMessage.DUPLICATION:
          return "#FF4F4F";
        case emailInvalidMessage.TIME:
            return "#5200FF";
        default:
            return "transparent"
        }
}

// export function setEmailErrorIcon(emailErrorMessage:string){ 
//     switch (emailErrorMessage) {
//         case emailInvalidMessage.FORM:
//             return typeof SignUpVerifyIc;
//         case emailInvalidMessage.DUPLICATION:
//             return typeof SignUpVerifyIc;
//         case emailInvalidMessage.VERIFY:
//             return typeof SignUpVerifyIc;
//         default:
//             return ;
//     }
// }