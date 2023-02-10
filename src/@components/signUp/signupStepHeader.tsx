import React from 'react'
import { LoginHereMessageIc, SignUpStep1Ic, SignUpStep2Ic, SignUpStep3Ic, SignUpStepBlanckIc } from '../../assets';
import { StepPropsType } from '../../type/signUpStepTypes'
import { chaeckStepType } from '../../utils/signUp/stepType';


export default function SignupStepHeader(props:StepPropsType) {
    const {step}=props;

  return (
    <>
        {chaeckStepType(step)===1?<SignUpStep1Ic/>:<SignUpStepBlanckIc/>}
        {chaeckStepType(step)===2?<SignUpStep2Ic/>:<SignUpStepBlanckIc/>}
        {chaeckStepType(step)===3?<SignUpStep3Ic/>:<SignUpStepBlanckIc/>}
        <LoginHereMessageIc/>
    </>
  )
}
