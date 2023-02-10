import { signUpStep } from "../../core/signUp/signupStepType";

export function isMessageLogo(userType: string) {
  if(userType === signUpStep.SIGNUP_ROLE||signUpStep.SIGNUP_EMAIL||signUpStep.SIGNUP_PASSWORD||signUpStep.SIGNUP_NICKNAME){
    return true;
  }
}

export function isMessageWelcome(userType: string): boolean {
  return userType === signUpStep.SIGNUP_PROFILE;
}
