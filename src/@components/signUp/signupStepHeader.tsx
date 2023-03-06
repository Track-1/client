import styled from 'styled-components';
import { LoginHereMessageIc, SignUpStep1Ic, SignUpStep2Ic, SignUpStep3Ic, SignUpStepBlanckIc } from '../../assets';
import { StepPropsType } from '../../type/signUpStepTypes'
import { chaeckStepType } from '../../utils/signUp/stepType';
import { useNavigate } from 'react-router-dom';


export default function SignupStepHeader(props:StepPropsType) {
    const {step}=props;
    const navigate=useNavigate()

    function moveLoginPage(){
        navigate('/log-in')
    }

  return (
    <StepHeaderWrapper>
        <StepsWrapper>
            {chaeckStepType(step)===1?<SignUpStep1Ic/>:<SignUpStepBlanckIc/>}
            {chaeckStepType(step)===2?<SignUpStep2Ic/>:<SignUpStepBlanckIc/>}
            {chaeckStepType(step)===3?<SignUpStep3Ic/>:<SignUpStepBlanckIc/>}
        </StepsWrapper>
        <LoginHereMessageIcon onClick={moveLoginPage}/>
    </StepHeaderWrapper>
  )
}

const LoginHereMessageIcon=styled(LoginHereMessageIc)`
    cursor: pointer;
`

const StepsWrapper=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 11.2rem;
    height: 2.4rem;
`

const StepHeaderWrapper=styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 56rem;
    height: 2.4rem;

    margin: 7rem 0 0 11rem;
`