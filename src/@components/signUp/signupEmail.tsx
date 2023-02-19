import React from 'react'
import styled from 'styled-components';
import { SignUpBackArrowIc, SignUpContinueButtonIc, SignUpEmailTitleIc, SignUpErrorIc, SignUpPasswordIc, SignUpVerifyIc, VerificationCodeTextIc, WhatsYourEmailIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import { useState } from 'react';
import SendCodeButton from './sendCodeButton';
import { emailInvalidMessage } from '../../core/userInfoErrorMessage/emailErrorMessage';
import { checkEmailForm } from '../../utils/errorMessage/checkEmailValidation';
import { authEmail } from '../../core/api/signUp';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import VerifyButton from './verifyButton';
import ContinueButton from './continueButton';

export default function SignupEmail(props:SetStepPropsType) {
    const {setStep}=props;
    const [email, setEmail]=useState<string>('')
    const [password, setPassword]=useState<string>('')
    const [emailErrorMessage, setEmailErrorMessage]=useState<string>(emailInvalidMessage.NULL)
    const [isSendCode, setIsSendCode]=useState<boolean>(false)
    const [verificationCode, setVerificationCode]=useState<string>('')

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

    function writeVerificationCode(e: React.ChangeEvent<HTMLInputElement>){
        setVerificationCode(e.target.value)
    }

    function setInputUnderline(){ 
        switch (emailErrorMessage) {
            case emailInvalidMessage.NULL:
              return "#535559"
            case emailInvalidMessage.FORM:
                return "#FF4F4F";
                case emailInvalidMessage.DUPLICATION:
              return "#FF4F4F";
            case emailInvalidMessage.VERIFY:
                return "#5200FF";
            default:
                return "white"
            }
    }

    function setMessageColor(){ 
        switch (emailErrorMessage) {
            case emailInvalidMessage.NULL:
              return "transparent"
            case emailInvalidMessage.FORM:
                return "#FF4F4F";
                case emailInvalidMessage.DUPLICATION:
              return "#FF4F4F";
            case emailInvalidMessage.TIME:
                return "#5200FF";
            default:
                return "transparent"
            }
    }

    function setErrorIcon(){ 
        switch (emailErrorMessage) {
            case emailInvalidMessage.FORM:
                return <SignUpErrorIc/>;
            case emailInvalidMessage.DUPLICATION:
                return <SignUpErrorIc/>;
            case emailInvalidMessage.VERIFY:
                return <SignUpVerifyIc/>;
            default:
                return ;
        }
    }

    function isEmailSuccess(){
        return emailErrorMessage===emailInvalidMessage.SUCCESS
    }

    function sendCode(e: React.MouseEvent){
        console.log("클릭")
        //post함수 추가
        setIsSendCode(true)
        setEmailErrorMessage(emailInvalidMessage.TIME)
    }

    function verifyCode(e: React.MouseEvent){
        //post함수 추가
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
            <InputWrapper>
                <Input type="email" placeholder="Enter your email address" width={42.2} underline={setInputUnderline()} onChange={writeEmail}/>
                {
                    setErrorIcon()&&(
                    <IconWrapper>
                        {setErrorIcon()}
                    </IconWrapper>
                    )
                }
                <SendCodeButton isEmailSuccess={isEmailSuccess()} onClick={(e: React.MouseEvent<HTMLElement>) => sendCode(e)} isSendCode={isSendCode}/>
            </InputWrapper>
            <MessageWrapper textColor={setMessageColor()}>
                {emailErrorMessage}
            </MessageWrapper>
            <VerificationCodeTextIcon/>
            <InputWrapper>
                <Input type="text" placeholder="Verify your email address" width={42.2} underline={setInputUnderline()} onChange={writeVerificationCode}/>
                <VerifyButton verificationCode={verificationCode} onClick={(e: React.MouseEvent<HTMLElement>) => verifyCode(e)}/>
            </InputWrapper>
            <SignUpPasswordIcon/>
            <Input type="password" placeholder="Create a password" width={56} underline={setInputUnderline()} onChange={writePassword}/>
        </SignupEmailWrapper>
        <ArrowButtonWrapper>
            <SignUpBackArrowIcon/>
            <ContinueButton answer={''} step={''} setStep={setStep}/>
        </ArrowButtonWrapper>
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
    
    border-bottom: 0.1rem solid ${({underline})=>underline};

    color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.fonts.input};

    &::placeholder{
        color: ${({ theme }) => theme.colors.gray4};
    }
`

const InputWrapper=styled.div`
    display: flex;
    align-items: center;
`

const MessageWrapper=styled.p<{textColor:string}>`
    margin-top: 1.1rem;

    color: ${({textColor})=>textColor};

    ${({ theme }) => theme.fonts.error_message};
`

const IconWrapper=styled.div`
    margin: 1.4rem 0 0 -3.9rem;
`

const VerificationCodeTextIcon=styled(VerificationCodeTextIc)`
    margin-top: 3.2rem;
`

const SignUpBackArrowIcon=styled(SignUpBackArrowIc)`
    position: absolute;
    margin-left:11rem;
`

const ArrowButtonWrapper=styled.div`
    margin-top:2.8rem;
`