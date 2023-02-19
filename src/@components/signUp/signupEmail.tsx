import React from 'react'
import styled from 'styled-components';
import { SignUpEmailTitleIc, SignUpPasswordIc, WhatsYourEmailIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import { useState } from 'react';
import SendCodeButton from './sendCodeButton';
import { emailInvalidMessage } from '../../core/userInfoErrorMessage/emailErrorMessage';
import { checkEmailForm } from '../../utils/errorMessage/checkEmailValidation';

export default function SignupEmail(props:SetStepPropsType) {
    const {setStep}=props;
    const [email, setEmail]=useState<string>('')
    const [password, setPassword]=useState<string>('')
    const [emailErrorMessage, setEmailErrorMessage]=useState<string>(emailInvalidMessage.NULL)

    function writeEmail(e: React.ChangeEvent<HTMLInputElement>){
        if(!e.target.value){
            setEmailErrorMessage(emailInvalidMessage.NULL)
        }

        else if (checkEmailForm(e.target.value)){
            setEmailErrorMessage(emailInvalidMessage.SUCCESS)
        }

        else if(!checkEmailForm(e.target.value)){
            setEmailErrorMessage(emailInvalidMessage.FORM)
        }

        setEmail(e.target.value)
    }

    function writePassword(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value)
    }


  return (
    <>
        <SignUpEmailTitleIcon/>
        <SignupEmailWrapper>
            <WhatsYourEmailIcon/>
            <EmailInputWrapper>
                <Input type="email" placeholder="Enter your email address" width={42.2} onChange={writeEmail}/>
                <SendCodeButton/>
            </EmailInputWrapper>
            <MessageWrapper>
                {emailErrorMessage}
            </MessageWrapper>
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

const EmailInputWrapper=styled.div`
    display: flex;
`

const MessageWrapper=styled.p`
    margin-top: 1.1rem;

    color: #FF4F4F;

    ${({ theme }) => theme.fonts.error_message};
`