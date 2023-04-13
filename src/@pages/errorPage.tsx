import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import ConventionModal from '../@components/@common/conventionModal'
import { openConventionModal } from '../recoil/conventionModal'
import SignBackground from "../assets/icon/signUpBackgroundIc.svg";
import Footer from '../@components/@common/footer'
import { ErrorPageIc, ErrorPageMainIc, ErrorPageTextIc, TrackOneMainLogoIc } from '../assets'
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
    const showModal=useRecoilValue(openConventionModal);
    const background=SignBackground;
    const navigate=useNavigate();

    function moveToMain(){
        navigate("/")
    }

    async function copyLink(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            alert("Copy link completed.\n링크가 복사되었습니다. ");
        } catch (err) {
            console.log(err);
        }
    };
    

  return (
    <>
    <ErrorPageContainer>
    <Img src={background} alt="배경"/>
    <Header>
        <TrackOneMainLogoIcon onClick={moveToMain}/>
    </Header>
        <ErrorPageWrapper>
            <ErrorPageMainIcon/>
            <ErrorPageTextIcon/>
            <DescriptionWrapper>
                <p>Something went wrong</p>
                <p>Please Refresh Your Browser</p>
            </DescriptionWrapper>
            <ContactTextWrapper>
                <p>Or Please contact us </p>
                <EmailLink onClick={()=>copyLink('track-1@track-1.link')}>track-1@track-1.link</EmailLink>
            </ContactTextWrapper>
        </ErrorPageWrapper>
    </ErrorPageContainer>

    {showModal&&(<ConventionModal/>)}
    </>
  )
}


const ErrorPageContainer=styled.main`
    position: absolute;
`

const ErrorPageWrapper=styled.section`
    display:flex;
    flex-direction:column;
    align-items:center;

    width: 72.7rem;
    height: 66.2rem;

    margin: 6.6rem 0 20.9rem 59.7rem;

    backdrop-filter: blur(1rem);

    border: 0.3rem solid transparent;
    border-radius: 5rem;
    background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3E4045);

    background-origin: border-box;
    background-clip: content-box, border-box;
`

const Img=styled.img`
    position: absolute;
    width: 192rem;
    height: 90rem;

    bottom:0;
`

const ErrorPageMainIcon=styled(ErrorPageMainIc)`
    width:21.8rem;
    height:21.8rem;   

    margin:9rem 0 5rem 0;
`

const ErrorPageTextIcon=styled(ErrorPageTextIc)`
    width:39.2rem;

    margin-bottom:3rem;
`

const DescriptionWrapper=styled.article`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    color:${({theme})=>theme.colors.gray1};
    ${({theme})=>theme.fonts.body1};
`

const ContactTextWrapper=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;

    margin: 4rem;
    color:${({theme})=>theme.colors.gray3};
    
    ${({theme})=>theme.fonts.hashtag};
`

const TrackOneMainLogoIcon=styled(TrackOneMainLogoIc)`
  width: 26.3rem;
  
  cursor: pointer;
`

const Header=styled.header`
    position:sticky;
    top:0;

    padding: 5.9rem 7.5rem;
`

const EmailLink=styled.a`
    margin-left:1rem;

    color:${({theme})=>theme.colors.gray2};

    cursor:pointer;
`