import { signUpStep } from "../../core/signUp/signupStepType";

export function isMessageLogo(stepType: string):boolean {
  console.log(stepType)
  return(
    (stepType === signUpStep.SIGNUP_ROLE||signUpStep.SIGNUP_EMAIL_PASSWORD||signUpStep.SIGNUP_NICKNAME_CONVENTION)?true:false
  )
}

export function isMessageWelcome(stepType: string): boolean {
  return stepType === signUpStep.SIGNUP_PROFILE;
}
