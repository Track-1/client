import React from 'react'
import { signUpStep } from '../../core/signUp/signupStepType';
import { StepPropsTypes } from '../../type/signUpStepTypes';
import SignupRole from './signupRole';

export default function signUpStepRenderer(props:StepPropsTypes) {
  const { step,setStep } = props;

    switch (step) {
        case signUpStep.SIGNUP_ROLE:
          return <SignupRole setStep={setStep} />;
        // case signUpStep.SIGNUP_EMAIL:
        //   return <SignupEmail setStep={setStep} />;
        // case signUpStep.SIGNUP_PASSWORD:
        //   return <SignupPassword setStep={setStep} />;
        // case signUpStep.SIGNUP_NICKNAME:
        //   return <SignupNickname setStep={setStep} />;
        // case signUpStep.SIGNUP_PROFILE:
        //     return <SignupProfile setStep={setStep} />;
        // case signUpStep.SIGNUP_SUCCESS:
        //     return <SignupSuccess setStep={setStep} />;  
        default:
          return <SignupRole setStep={setStep} />;
      }
}
