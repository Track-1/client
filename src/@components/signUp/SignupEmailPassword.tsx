import React from 'react'
import styled from 'styled-components';
import { SignUpBackArrowIc, SignUpEmailTitleIc, SignUpErrorIc, SignUpPasswordIc, SignUpVerifyIc, VerificationCodeTextIc, WeSentYouACodeTextIc, WhatsYourEmailIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import { useState } from 'react';
import SendCodeButton from './sendCodeButton';
import { emailInvalidMessage } from '../../core/userInfoErrorMessage/emailInvalidMessage';
import { checkEmailForm } from '../../utils/errorMessage/checkEmailValidation';
import { authEmail } from '../../core/api/signUp';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import VerifyButton from './verifyButton';
import ContinueButton from './continueButton';
import { signUpStep } from '../../core/signUp/signupStepType';
import { verificationCodeInvalidMessage } from '../../core/userInfoErrorMessage/verificationCodeInvalidMessage';
import { setInputUnderline, setMessageColor } from '../../utils/errorMessage/setInputStyle';

export default function SignupEmailPassword(props:SetStepPropsType) {
    const {setStep}=props;
    const [email, setEmail]=useState<string>('')
    const [emailErrorMessage, setEmailErrorMessage]=useState<string>(emailInvalidMessage.NULL)
    const [password, setPassword]=useState<string>('')
    const [isSendCode, setIsSendCode]=useState<boolean>(false)
    const [verificationCode, setVerificationCode]=useState<string>('')
    const [verificationCodeErrorMessage, setVerificationCodeErrorMessage]=useState<string>(verificationCodeInvalidMessage.NULL)


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
        //post함수 추가 -> 
        // if(맞으면){}
        setIsSendCode(false)
    }

    function backToRole(){
        setStep(signUpStep.SIGNUP_ROLE)
    }

    function setErrorIcon(message:string){ 
        switch (message) {
            case emailInvalidMessage.FORM:
                return <SignUpErrorIc/>;
            case emailInvalidMessage.DUPLICATION:
                return <SignUpErrorIc/>;
            case emailInvalidMessage.VERIFY:
                return <SignUpVerifyIc/>;
            case verificationCodeInvalidMessage.ERROR:
                return <SignUpErrorIc/>;    
            default:
                return ;
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
        <TitleWrapper>
            {isSendCode?<WeSentYouACodeTextIc/>:<SignUpEmailTitleIc/>}
        </TitleWrapper>
        <SignupEmailWrapper>
            <WhatsYourEmailIcon/>
            <InputWrapper>
                <Input type="email" placeholder="Enter your email address" width={42.2} underline={setInputUnderline(emailErrorMessage)} onChange={writeEmail}/>
                {setErrorIcon(emailErrorMessage)&&(
                    <IconWrapper>
                        {setErrorIcon(emailErrorMessage)}
                    </IconWrapper>
                )}
                <SendCodeButton isEmailSuccess={isEmailSuccess()} onClick={(e: React.MouseEvent<HTMLElement>) => sendCode(e)} isSendCode={isSendCode}/>
            </InputWrapper>
            <MessageWrapper textColor={setMessageColor(emailErrorMessage)}>
                {emailErrorMessage}
            </MessageWrapper>
            {isSendCode&&(
                <>
                <VerificationCodeTextIcon/>
                <InputWrapper>
                    <Input type="text" placeholder="Verify your email address" width={42.2} underline={setInputUnderline(verificationCodeErrorMessage)} onChange={writeVerificationCode}/>
                    {setErrorIcon(verificationCodeErrorMessage)&&(
                        <IconWrapper>
                            {setErrorIcon(verificationCodeErrorMessage)}
                        </IconWrapper>
                    )}
                    <VerifyButton verificationCode={verificationCode} onClick={(e: React.MouseEvent<HTMLElement>) => verifyCode(e)}/>
                </InputWrapper>
                <MessageWrapper textColor={setMessageColor(verificationCodeErrorMessage)}>
                    {verificationCodeErrorMessage}
                </MessageWrapper>
                </>
            )}
            <SignUpPasswordIcon/>
            <InputWrapper>
                {/* <Input type="password" placeholder="Create a password" width={56} underline={setInputUnderline()} onChange={writePassword}/> */}
            </InputWrapper>
        </SignupEmailWrapper>
        <ArrowButtonWrapper>
            <SignUpBackArrowIcon onClick={backToRole}/>
            <ContinueButton answer={''} step={''} setStep={setStep}/>
        </ArrowButtonWrapper>
    </>
  )
}

const TitleWrapper=styled.section`
    display: flex;
    justify-content: center;

    margin-top:7.65rem;
`

const WhatsYourEmailIcon=styled(WhatsYourEmailIc)`
    margin-top: 5.96rem;
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

    cursor: pointer;
`

const ArrowButtonWrapper=styled.div`
    margin-top:2.8rem;
`