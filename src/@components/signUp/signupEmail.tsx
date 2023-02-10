import React from 'react'
import { WhatsYourEmailIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';

export default function SignupEmail(props:SetStepPropsType) {
    const {setStep}=props;

  return (
    <WhatsYourEmailIc/>
  )
}
