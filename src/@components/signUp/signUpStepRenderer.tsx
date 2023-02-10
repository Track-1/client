import React from 'react'

export default function signUpStepRenderer({step, setStep}) {
    switch (step) {
        case 'SIGNUP_ROLE':
          return <SignupRole setStep={setStep} />;
        case 'SIGNUP_EMAIL':
          return <SignupEmail setStep={setStep} />;
        case 'SIGNUP_PASSWORD':
          return <SignupPassword setStep={setStep} />;
        case 'SIGNUP_NICKNAME':
          return <SignupNickname setStep={setStep} />;
        case 'SIGNUP_PROFILE':
            return <SignupProfile setStep={setStep} />;
        case 'SIGNUP_SUCCESS':
            return <SignupSuccess setStep={setStep} />;  
        default:
          return <SignupRole setStep={setStep} />;
      }
}
