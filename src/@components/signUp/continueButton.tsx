import React from 'react'
import styled from 'styled-components'
import { SignUpContinueButtonIc } from '../../assets'
import { ContinueButtonPropsTypes } from '../../type/signUpStepTypes'

export default function ContinueButton(props:ContinueButtonPropsTypes) {
    const {answer, setStep}=props

    function isNotNull(answer:string){
        return answer!==''
    }

  return (
    <ContinueButtonWrapper type="button" isNotNull={isNotNull(answer)}>
        <SignUpContinueButtonIc/>
    </ContinueButtonWrapper>
  )
}

const ContinueButtonWrapper=styled.button<{isNotNull:boolean}>`
    width: 17rem;
    height: 4.6rem;

    border-radius: 2.5rem;
    border: 0.1rem solid ${({ theme, isNotNull }) => isNotNull?theme.colors.main:theme.colors.gray4};
    background-color: ${({ theme, isNotNull }) => isNotNull?theme.colors.main:theme.colors.gray4};
`