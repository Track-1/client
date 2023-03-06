import { signUpStep } from "../../core/signUp/signupStepType";

export function chaeckStepType(stepType: string) {
    if(stepType === signUpStep.SIGNUP_ROLE){
        return 1
    }
    else if(stepType === signUpStep.SIGNUP_EMAIL||signUpStep.SIGNUP_PASSWORD){
        return 2
    }
    else if(stepType === signUpStep.SIGNUP_NICKNAME){
        return 3
    }
}
