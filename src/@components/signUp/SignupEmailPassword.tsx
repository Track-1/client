import React from 'react'
import styled from 'styled-components';
import { ConfirmPasswordTextIc, SignUpBackArrowIc, SignUpEmailTitleIc, SignUpErrorIc, SignUpEyeIc, SignUpPasswordIc, SignUpVerifyIc, VerificationCodeTextIc, WeSentYouACodeTextIc, WhatsYourEmailIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import { useState } from 'react';
import SendCodeButton from './sendCodeButton';
import { emailInvalidMessage } from '../../core/userInfoErrorMessage/emailInvalidMessage';
import { checkEmailForm } from '../../utils/errorMessage/checkEmailForm';
import { authEmail } from '../../core/api/signUp';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import VerifyButton from './verifyButton';
import ContinueButton from './continueButton';
import { signUpStep } from '../../core/signUp/signupStepType';
import { verificationCodeInvalidMessage } from '../../core/userInfoErrorMessage/verificationCodeInvalidMessage';
import { setInputUnderline, setMessageColor } from '../../utils/errorMessage/setInputStyle';
import { passwordInvalidMessage } from '../../core/userInfoErrorMessage/passwordInvalidMessage';
import { checkPasswordForm } from '../../utils/errorMessage/checkPasswordForm';

export default function SignupEmailPassword(props:SetStepPropsType) {
    const {setStep}=props;
    const [email, setEmail]=useState<string>('')
    const [emailMessage, setEmailMessage]=useState<string>(emailInvalidMessage.NULL)
    const [password, setPassword]=useState<string>('')
    const [passwordMessage, setPasswordMessage]=useState<string>(passwordInvalidMessage.NULL)
    const [isSendCode, setIsSendCode]=useState<boolean>(false)
    const [verificationCode, setVerificationCode]=useState<string>('')
    const [verificationCodeMessage, setVerificationCodeMessage]=useState<string>(verificationCodeInvalidMessage.NULL)
    const [isVerify, setIsVerify]=useState<boolean>(false)
    const [passwordConfirm, setPasswordConfirm]=useState<string>('')
    const [passwordConfirmMessage, setPasswordConfirmMessage]=useState<string>(passwordInvalidMessage.NULL)

    function writeEmail(e: React.ChangeEvent<HTMLInputElement>){
        if(!e.target.value){
            setEmailMessage(emailInvalidMessage.NULL)
        }

        else if(!checkEmailForm(e.target.value)){
            setEmailMessage(emailInvalidMessage.FORM)
        }

        //임시
        else if(checkEmailForm(e.target.value)){
            setEmailMessage(emailInvalidMessage.SUCCESS)
        }

        setEmail(e.target.value)
    }

    function writePassword(e: React.ChangeEvent<HTMLInputElement>){
        if(!e.target.value){
            setPasswordMessage(passwordInvalidMessage.NULL)
        }

        else if(!checkPasswordForm(e.target.value)){
            setPasswordMessage(passwordInvalidMessage.FORM)
        }

        else if(checkPasswordForm(e.target.value)){
            setPasswordMessage(passwordInvalidMessage.SUCCESS)
        }

        setPassword(e.target.value)
    }

    function writePasswordConfirm(e: React.ChangeEvent<HTMLInputElement>){
        if(!e.target.value){
            setPasswordConfirmMessage(passwordInvalidMessage.NULL)
        }

        else if(e.target.value!==password){
            setPasswordConfirmMessage(passwordInvalidMessage.MATCH)
        }

        else if(e.target.value===password){
            setPasswordConfirmMessage(passwordInvalidMessage.SUCCESS)
        }

        setPasswordConfirm(e.target.value)
    }

    function writeVerificationCode(e: React.ChangeEvent<HTMLInputElement>){
        setVerificationCode(e.target.value)
    }



    function isEmailSuccess(){
        return emailMessage===emailInvalidMessage.SUCCESS
    }

    function sendCode(e: React.MouseEvent){
        console.log("클릭")
        //post함수 추가
        setIsSendCode(true)
        setEmailMessage(emailInvalidMessage.TIME)
    }

    function verifyCode(e: React.MouseEvent){
        //post함수 추가 -> 
        // if(맞으면){}
        setIsSendCode(false)
        setIsVerify(true)
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
            case passwordInvalidMessage.FORM:
                return <SignUpErrorIc/>;        
            case passwordInvalidMessage.MATCH:
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

  console.log(passwordConfirmMessage)

  return (
    <>
        <TitleWrapper>
            {isSendCode?<WeSentYouACodeTextIc/>:<SignUpEmailTitleIc/>}
        </TitleWrapper>
        <SignupEmailWrapper>
            <WhatsYourEmailIcon/>
            <InputWrapper>
                <Input type="email" placeholder="Enter your email address" width={42.2} underline={setInputUnderline(emailMessage)} onChange={writeEmail}/>
                {setErrorIcon(emailMessage)&&(
                    <IconWrapper marginLeft={-3.9}>
                        {setErrorIcon(emailMessage)}
                    </IconWrapper>
                )}
                <SendCodeButton isEmailSuccess={isEmailSuccess()} onClick={(e: React.MouseEvent<HTMLElement>) => sendCode(e)} isSendCode={isSendCode}/>
            </InputWrapper>
            <MessageWrapper textColor={setMessageColor(emailMessage)}>
                {emailMessage}
            </MessageWrapper>
            {isSendCode&&(
                <>
                <VerificationCodeTextIcon/>
                <InputWrapper>
                    <Input type="text" placeholder="Verify your email address" width={42.2} underline={setInputUnderline(verificationCodeMessage)} onChange={writeVerificationCode}/>
                    {setErrorIcon(verificationCodeMessage)&&(
                        <IconWrapper marginLeft={-3.9}>
                            {setErrorIcon(verificationCodeMessage)}
                        </IconWrapper>
                    )}
                    <VerifyButton verificationCode={verificationCode} onClick={(e: React.MouseEvent<HTMLElement>) => verifyCode(e)}/>
                </InputWrapper>
                <MessageWrapper textColor={setMessageColor(verificationCodeMessage)}>
                    {verificationCodeMessage}
                </MessageWrapper>
                </>
            )}
            <SignUpPasswordIcon/>
            <InputWrapper>
                <Input type="password" placeholder="Create a password" width={56} underline={setInputUnderline(passwordMessage)} onChange={writePassword}/>
                {setErrorIcon(passwordMessage)&&(
                    <IconWrapper marginLeft={-8.4}>
                        {setErrorIcon(passwordMessage)}
                    </IconWrapper>
                )}
                <SignUpEyeIcon/>
            </InputWrapper>
            <MessageWrapper textColor={setMessageColor(passwordMessage)}>
                {passwordMessage}
            </MessageWrapper>
            {isVerify&&(
                <>
                <ConfirmPasswordTextIcon/>
                <InputWrapper>
                    <Input type="password" placeholder="Enter a password again" width={56} underline={setInputUnderline(passwordMessage)} onChange={writePasswordConfirm}/>
                    {setErrorIcon(passwordConfirmMessage)&&(
                        <IconWrapper marginLeft={-8.4}>
                            {setErrorIcon(passwordConfirmMessage)}
                        </IconWrapper>
                    )}
                    <SignUpEyeIcon/>
                </InputWrapper>
                <MessageWrapper textColor={setMessageColor(passwordConfirmMessage)}>
                    {passwordConfirmMessage}
                </MessageWrapper>  
                </>              
            )}
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
    margin-top: 3.2rem;
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

const IconWrapper=styled.div<{marginLeft:number}>`
    margin: 2rem 0 0 ${({marginLeft})=>marginLeft}rem;
`

const VerificationCodeTextIcon=styled(VerificationCodeTextIc)`
    margin-top: 3.2rem;
`

const ConfirmPasswordTextIcon=styled(ConfirmPasswordTextIc)`
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

const SignUpEyeIcon=styled(SignUpEyeIc)`
    position: absolute;
    
    margin: 1.9rem 0 0 52rem;
`