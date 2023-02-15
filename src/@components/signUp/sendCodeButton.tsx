import React from 'react'
import styled from 'styled-components'
import { SignupSendcodeTextIc } from '../../assets'

export default function SendCodeButton() {
  return (
    <ButtonWrapper>
        <SignupSendcodeTextIc/>
    </ButtonWrapper>
  )
}

const ButtonWrapper=styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 12.7rem;
    height: 4rem;

    margin: 2.4rem 0 0 1rem;

    border-radius: 5rem;
    background-color: ${({ theme }) => theme.colors.gray4};
    /* background-color: ${({ theme }) => theme.colors.main}; */
`