import React from 'react'
import styled from 'styled-components';
import { SignUpEmailTitleIc, SignUpPasswordIc, WhatsYourEmailIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';

export default function SignupEmail(props:SetStepPropsType) {
    const {setStep}=props;

  return (
    <SignupEmailWrapper>
    <SignUpEmailTitleIc/>
    <WhatsYourEmailIc/>
    <SignUpPasswordIc/>
    </SignupEmailWrapper>
  )
}

const SignupEmailWrapper=styled.section`
    display: flex;
    flex-direction: column;
`