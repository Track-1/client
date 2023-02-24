import { useState } from "react";
import styled from 'styled-components';
import BackButton from '../@components/@common/backButton';
import { SignBackgroundIc } from '../assets';
import Footer from '../@components/@common/footer';
import SignUpStepRenderer from '../@components/signUp/signUpStepRenderer';
import { signUpStep } from '../core/signUp/signupStepType';
import SignupMessage from "../@components/signUp/signupMessage";
import SignupStepHeader from "../@components/signUp/signupStepHeader";
import ConventionModal from "../@components/@common/conventionModal";
import SignBackground from "../assets/icon/signUpBackgroundIc.svg";

export default function SignUpPage() {
    const background=SignBackground
    const [step, setStep] = useState<string>(signUpStep.SIGNUP_ROLE);

    function endSignUp(){
        if (window.confirm('회원가입을 종료하겠습니까?'))
        {
            // clicked Yes
        }
    }

  return (
    <>
        <ConventionModal/>

        <BackButtonWrapper onClick={endSignUp}>
            <BackButton/>
        </BackButtonWrapper>
        <SignUpContainer background={background}>
            <SignUpStepWrapper>
                <SignupMessage step={step}/>
                <StepBox>
                    <SignupStepHeader step={step}/>
                    <SignUpStepRenderer step={step} setStep={setStep} />
                </StepBox>
            </SignUpStepWrapper>
        </SignUpContainer>

        <Footer/>
    </>
  )
}

const BackButtonWrapper=styled.div`
    margin: 5.9rem 0 0 7.9rem;
`


const SignUpContainer=styled.div<{background:string}>`
    width: 192rem;
    height: 98rem;

    background-image: url(${({background})=>background});
`

const SignUpStepWrapper=styled.div`
    display: flex;
`

const StepBox=styled.div`
    width: 77.9rem;
    height: 88.8rem;

    backdrop-filter: blur(1rem);

    border: 0.3rem solid transparent;
    border-radius: 5rem;
    background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3E4045);

    background-origin: border-box;
    background-clip: content-box, border-box;
`
