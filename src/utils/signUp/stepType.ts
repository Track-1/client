import { signUpStep } from "../../core/signUp/signupStepType";

export function checkStepType(stepType: string) {
    if(stepType === signUpStep.SIGNUP_ROLE){
        return 1
    }
    else if(stepType === signUpStep.SIGNUP_EMAIL_PASSWORD){
        return 2
    }
    else if(stepType === signUpStep.SIGNUP_NICKNAME_CONVENTION){
        return 3
    }
    else{
        return 4
    }
}
