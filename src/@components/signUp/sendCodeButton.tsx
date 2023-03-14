import React from 'react'
import styled from 'styled-components'
import { SignUpResendButtonIc, SignupSendcodeTextIc } from '../../assets'
import { verificationCodeInvalidMessage } from '../../core/userInfoErrorMessage/verificationCodeInvalidMessage';
import { emailInvalidMessage } from '../../core/userInfoErrorMessage/emailInvalidMessage';

interface ButtonPropsType{
  isEmailSuccess:boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  isSendCode:boolean;
  isResendCode:boolean;
  emailMessage:string;
}

export default function SendCodeButton(props:ButtonPropsType) {
  const {isEmailSuccess, onClick, isSendCode, isResendCode, emailMessage}=props;

  function checkEmailVerify(){
    return emailMessage===emailInvalidMessage.VERIFY
  }

  function checkEmailTime(){
    return emailMessage===emailInvalidMessage.TIME
  }

  function isActive(){
    if (checkEmailVerify()){
      return false;
    }
    else{
      if(isEmailSuccess||isSendCode||isResendCode){
        return true
      }
      else{
        return false
      }
    }
  }


  return (
    <ButtonWrapper isActive={isActive()} onClick={onClick}>
        {checkEmailTime()?<SignUpResendButtonIcon/>:<SignupSendcodeTextIcon/>}
    </ButtonWrapper>
  )
}

const ButtonWrapper=styled.button<{isActive:boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 12.7rem;
    height: 4rem;

    margin: 2.4rem 0 0 1rem;

    border-radius: 5rem;
    background-color: ${({ theme,isActive }) => isActive?theme.colors.main:theme.colors.gray4};
`

const SignupSendcodeTextIcon=styled(SignupSendcodeTextIc)`
  width: 9.3rem;
`

const SignUpResendButtonIcon=styled(SignUpResendButtonIc)`
  width: 6.3rem;
`