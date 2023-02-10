import styled from 'styled-components';
import BackButton from '../@components/@common/backButton';
import { SignBackgroundIc } from '../assets';
import Footer from '../@components/@common/footer';
import SignUpStepRenderer from '../@components/signUp/signUpStepRenderer';
import { useEffect, useState } from 'react';

export default function signUpPage() {
    // type step= 'SIGNUP_ROLE' | 'SIGNUP_EMAIL' | 'SIGNUP_PASSWORD' | 'SIGNUP_NICKNAME' | 'SIGNUP_PROFILE' | 'SIGNUP_SUCCESS'
  const [step, setStep] = useState<string>('SIGNUP_ROLE');

    function endSignUp(){
        if (window.confirm('회원가입을 종료하겠습니까?'))
        {
            // clicked Yes
        }
    }

  return (
    <>
        <SignUpStepRenderer step={step} setStep={setStep} />
        <BackButtonWrapper onClick={endSignUp}>
            <BackButton/>
        </BackButtonWrapper>
        <SignBackgroundIcon/>
        <Footer/>
    </>
  )
}

const BackButtonWrapper=styled.div`
    margin: 5.9rem 0 0 7.9rem;
`

const SignBackgroundIcon=styled(SignBackgroundIc)`
    margin-top: 26.6rem;
`