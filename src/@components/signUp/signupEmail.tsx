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
            <Input type="email" placeholder="Enter your email address" width={42.2} onChange={writeEmail}/>
            <SignUpPasswordIcon/>
            <Input type="password" placeholder="Create a password" width={56} onChange={writePassword}/>
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

const Input=styled.input<{width:number}>`
    display: flex;
    align-items: center;

    padding: 3rem 0 0.5rem 0;

    width: ${({width})=>width}rem;
    
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3};

    color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.fonts.input};

    &::placeholder{
        color: ${({ theme }) => theme.colors.gray4};
    }
`