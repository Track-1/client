import React from 'react'
import styled from 'styled-components';
import { SignUpEmailTitleIc, SignUpPasswordIc, WhatsYourEmailIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import { useState } from 'react';

export default function SignupEmail(props:SetStepPropsType) {
    const {setStep}=props;
    const [email, setEmail]=useState<string>('')
    const [password, setPassword]=useState<string>('')

    function writeEmail(e:any){
        setEmail(e.target.value)
    }

    function writePassword(e:any){
        setPassword(e.target.value)
    }

  return (
    <>
        <SignUpEmailTitleIcon/>
        <SignupEmailWrapper>
            <WhatsYourEmailIcon/>
            <Input type="email" placeholder="Enter your email address" onChange={writeEmail}/>
            <SignUpPasswordIcon/>
            <Input type="email" placeholder="Create a password" onChange={writePassword}/>
        </SignupEmailWrapper>
    </>
  )
}

const SignUpEmailTitleIcon=styled(SignUpEmailTitleIc)`
    margin:7.65rem 0 0 14.43rem;
`

const WhatsYourEmailIcon=styled(WhatsYourEmailIc)`
    margin-top: 13.45rem;
`

const SignUpPasswordIcon=styled(SignUpPasswordIc)`
    margin-top: 6.2rem;
`

const SignupEmailWrapper=styled.div`
    display: flex;
    flex-direction: column;

    margin-left:11rem;
`

const Input=styled.input`
    color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.fonts.input};
`