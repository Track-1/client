import React from 'react'
import { SignBgLogoIc, SignWelcomeIc } from '../../assets'
import { StepPropsType } from '../../type/signUpStepTypes'
import { isMessageLogo,isMessageWelcome } from '../../utils/signUp/checkMessageType';

export default function SignupMessage(props:StepPropsType) {
    const {step}=props;

  return (
    <>
    {isMessageLogo(step)&&<SignBgLogoIc/>}
    {isMessageWelcome(step)&&<SignWelcomeIc/>}
    </>
  )
}
