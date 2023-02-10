import React from 'react'
import { StepPropsTypes } from '../../type/signUpStepTypes';
import SignupRole from './signupRole';

export default function signUpStepRenderer(props:StepPropsTypes) {
  const { step,setStep } = props;

    switch (step) {
        case 'SIGNUP_ROLE':
          return <SignupRole setStep={setStep} />;
        // case 'SIGNUP_EMAIL':
        //   return <SignupEmail setStep={setStep} />;
        // case 'SIGNUP_PASSWORD':
        //   return <SignupPassword setStep={setStep} />;
        // case 'SIGNUP_NICKNAME':
        //   return <SignupNickname setStep={setStep} />;
        // case 'SIGNUP_PROFILE':
        //     return <SignupProfile setStep={setStep} />;
        // case 'SIGNUP_SUCCESS':
        //     return <SignupSuccess setStep={setStep} />;  
        default:
          return <SignupRole setStep={setStep} />;
      }
}
