import React from 'react'
import styled from 'styled-components'
import { SignUpResendButtonIc, SignupSendcodeTextIc } from '../../assets'

interface ButtonPropsType{
  isEmailSuccess:boolean;
  onClick: () => void;
  isSendCode:boolean;
}

export default function SendCodeButton(props:ButtonPropsType) {
  const {isEmailSuccess, isSendCode}=props;

  return (
    <ButtonWrapper isEmailSuccess={isEmailSuccess}>
        {isSendCode?<SignUpResendButtonIc/>:<SignupSendcodeTextIc/>}
    </ButtonWrapper>
  )
}

const ButtonWrapper=styled.button<{isEmailSuccess:boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 12.7rem;
    height: 4rem;

    margin: 2.4rem 0 0 1rem;

    border-radius: 5rem;
    background-color: ${({ theme,isEmailSuccess }) => isEmailSuccess?theme.colors.main:theme.colors.gray4};
`