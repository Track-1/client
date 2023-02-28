import { signUpHeader, signUpStep } from "../../core/signUp/signupStepType";

export function checkStepType(stepType: string) {
    if(stepType === signUpStep.SIGNUP_ROLE){
        return signUpHeader.ONE
    }
    else if(stepType === signUpStep.SIGNUP_EMAIL_PASSWORD){
        return signUpHeader.TWO
    }
    else if(stepType === signUpStep.SIGNUP_NICKNAME_CONVENTION){
        return signUpHeader.THREE
    }
    else{
        return signUpHeader.FOUR
    }
}
