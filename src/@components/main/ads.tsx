import React from 'react'
import styled from 'styled-components';
import { MainAdsIc } from '../../assets';
import adsImg from '../../assets/image/adsImg.png'

export default function Ads() {
  return (
    <>
    <AdsCover></AdsCover>
    <AdsWrapper>
    <MainAdsIcon/>
        <Img src={adsImg} alt="광고 이미지"/>
    </AdsWrapper>
    </>
  )
}

const AdsWrapper=styled.section`
    width: 192rem;
    height: 23rem;

    overflow: hidden;
`

const AdsCover=styled.div`
    width: 192rem;
    height: 23rem;

    position: absolute;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
`

const MainAdsIcon=styled(MainAdsIc)`
    width: 7.2rem;

    position: absolute;

    margin: 5.1rem 0 0 7.4rem;
`

const Img=styled.img`
    width: 100%;
`