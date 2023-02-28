import React from 'react'
import styled from 'styled-components'
import { SignUpGetStartedButtonIc, SignUpProducerButtonIc, SignUpProducerQIc, SignUpSuccessBackgroundIc, SignUpVocalButtonIc, SignUpVocalQIc } from '../../assets'
import { useNavigate } from 'react-router-dom';

export default function SignupSuccess() {
    const navigate=useNavigate()

    function moveToHome(){
        navigate('/')
    }

  return (
    <>
    <SuccessPageWrapper>
        {/* <SignUpVocalButtonIc/>
        <SignUpProducerButtonIc/> */}
        {/* <SignUpVocalQIc/>
        <SignUpProducerQIc/> */}
        <SignUpGetStartedButtonIcon onClick={moveToHome}/>
        <SignUpSuccessBackgroundIc/>
    </SuccessPageWrapper>
    </>
  )
}

const SuccessPageWrapper=styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
`

const SignUpGetStartedButtonIcon=styled(SignUpGetStartedButtonIc)`
    position: absolute;

    margin-top: 46.7rem;

    cursor: pointer;
`