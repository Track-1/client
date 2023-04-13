import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import ConventionModal from '../@components/@common/conventionModal'
import { openConventionModal } from '../recoil/conventionModal'
import SignBackground from "../assets/icon/signUpBackgroundIc.svg";
import Footer from '../@components/@common/footer'
import { ErrorPageIc, ErrorPageMainIc, ErrorPageTextIc } from '../assets'

export default function ErrorPage() {
    const showModal=useRecoilValue(openConventionModal);
    const background=SignBackground;

  return (
    <>
    <SignUpPageWrapper>
    <Img src={background} alt="배경"/>
        <SignUpContainer>
            <ErrorPageMainIcon/>
            <ErrorPageTextIcon/>
            <DescriptionWrapper>
                <p>Something went wrong</p>
                <p>Please Refresh Your Browser</p>
            </DescriptionWrapper>
            <ContactTextWrapper>
                <p>Or Please contact us </p>
                <p>track-1@track01.link</p>
            </ContactTextWrapper>
        </SignUpContainer>
        <Footer/>
    </SignUpPageWrapper>
    {showModal&&(<ConventionModal/>)}
    </>
  )
}


const SignUpPageWrapper=styled.div`
    position: absolute;
`

const SignUpContainer=styled.div`
    width: 192rem;
    height: 90rem;
`

const Img=styled.img`
    position: absolute;
    width: 192rem;
    height: 90rem;

`

const ErrorPageMainIcon=styled(ErrorPageMainIc)`
    width:21.8rem;
    height:21.8rem;   
`

const ErrorPageTextIcon=styled(ErrorPageTextIc)`
    width:49.2rem;
`