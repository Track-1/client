import styled from 'styled-components';
import BackButton from '../@components/@common/backButton';
import { SignBackgroundIc } from '../assets';

export default function signUpPage() {
  return (
    <>
        <BackButtonWrapper>
            <BackButton/>
        </BackButtonWrapper>
        <SignBackgroundIcon/>
    </>
  )
}

const BackButtonWrapper=styled.div`
    margin: 5.9rem 0 0 7.9rem;
`

const SignBackgroundIcon=styled(SignBackgroundIc)`
    margin-top: 26.6rem;
`