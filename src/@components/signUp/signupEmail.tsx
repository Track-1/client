import React from 'react'
import styled from 'styled-components';
import { SignUpEmailTitleIc, SignUpErrorIc, SignUpPasswordIc, WhatsYourEmailIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import { useState } from 'react';
import SendCodeButton from './sendCodeButton';
import { emailInvalidMessage } from '../../core/userInfoErrorMessage/emailErrorMessage';
import { checkEmailForm } from '../../utils/errorMessage/checkEmailValidation';
import { authEmail } from '../../core/api/signUp';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export default function SignupEmail(props:SetStepPropsType) {
    const {setStep}=props;
    const [email, setEmail]=useState<string>('')
    const [password, setPassword]=useState<string>('')
    const [emailErrorMessage, setEmailErrorMessage]=useState<string>(emailInvalidMessage.NULL)

    function writeEmail(e: React.ChangeEvent<HTMLInputElement>){
        if(!e.target.value){
            setEmailErrorMessage(emailInvalidMessage.NULL)
        }

        else if(!checkEmailForm(e.target.value)){
            setEmailErrorMessage(emailInvalidMessage.FORM)
        }

        //임시
        else if(checkEmailForm(e.target.value)){
            setEmailErrorMessage(emailInvalidMessage.SUCCESS)
        }

        setEmail(e.target.value)
    }

    function writePassword(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value)
    }

    function setInputUnderline(){ //이메일에러가 존재하는 경우
        switch (emailErrorMessage) {
            case emailInvalidMessage.NULL:
              return "${({ theme }) => theme.colors.gray3}";
            case emailInvalidMessage.FORM:
                return "#FF4F4F";
                case emailInvalidMessage.DUPLICATION:
              return "#FF4F4F";
            case emailInvalidMessage.SUCCESS:
                return "${({ theme }) => theme.colors.gray3}";
            default:
                return "${({ theme }) => theme.colors.gray3}";
        }
    }

    //post
  const { mutate } = useMutation(authEmail, {
    onSuccess: () => {
        console.log("성공")      
    },
    onError: (error) => { //400에러인 경우, 중복된 이메일
        console.log(error);
    }
  });

  const queryClient = useQueryClient();
  //post end

  useEffect(() => {
      let formData = new FormData();
      formData.append("tableName", "producer");
      formData.append("userEmail", email);
      mutate(formData);
  }, [email]);


  return (
    <>
        <SignUpEmailTitleIcon/>
        <SignupEmailWrapper>
            <WhatsYourEmailIcon/>
            <EmailInputWrapper>
                <Input type="email" placeholder="Enter your email address" width={42.2} underline={setInputUnderline()} onChange={writeEmail}/>
                <IconWrapper>
                    {setInputUnderline()}
                </IconWrapper>
                <SendCodeButton/>
            </EmailInputWrapper>
            <MessageWrapper>
                {emailErrorMessage}
            </MessageWrapper>
            <SignUpPasswordIcon/>
            <Input type="password" placeholder="Create a password" width={56} underline={setInputUnderline()} onChange={writePassword}/>
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

const Input=styled.input<{width:number, underline:string}>`
    display: flex;
    align-items: center;

    padding: 3rem 0 0.5rem 0;

    width: ${({width})=>width}rem;
    
    border-bottom: 0.1rem solid underline;

    color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.fonts.input};

    &::placeholder{
        color: ${({ theme }) => theme.colors.gray4};
    }
`

const EmailInputWrapper=styled.div`
    display: flex;
    align-items: center;
`

const MessageWrapper=styled.p`
    margin-top: 1.1rem;

    color: #FF4F4F;

    ${({ theme }) => theme.fonts.error_message};
`

const IconWrapper=styled.div`
    margin: 1.4rem 0 0 -3.9rem;
`