import React from 'react'
import styled from 'styled-components'
import { SignUpVerifyButtonIc } from '../../assets'

interface VerifyPropsType{
    verificationCode:string
}

export default function VerifyButton(props:VerifyPropsType) {
    const {verificationCode}=props;

    function isActive(){
        return verificationCode!=="";
    }
    
  return (
    <ButtonWrapper isActive={isActive()}>
        <SignUpVerifyButtonIc/>
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