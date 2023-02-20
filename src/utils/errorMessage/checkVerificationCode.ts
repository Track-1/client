import { verificationCodeMessage } from "../../core/userInfoErrorMessage/verificationCodeMessage";

export function setVerificationCodeInputUnderline(verificationCodeErrorMessage:string){ 
    switch (verificationCodeErrorMessage) {
        case verificationCodeMessage.NULL:
          return "#535559"
        case verificationCodeMessage.ERROR:
            return "#FF4F4F";
        default:
            return "white"
        }
}

export function setVerificationCodeMessageColor(verificationCodeErrorMessage:string){ 
    switch (verificationCodeErrorMessage) {
        case verificationCodeMessage.NULL:
          return "transparent"
        case verificationCodeMessage.ERROR:
            return "#FF4F4F";
        default:
            return "transparent"
        }
}
