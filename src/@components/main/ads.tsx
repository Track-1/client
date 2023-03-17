import React from 'react'
import styled from 'styled-components';
import { MainAdsIc } from '../../assets';
import adsImg from '../../assets/image/adsImg.png'

export default function Ads() {
  return (
    <>
    <MainAdsIc/>
    <AdsWrapper>
    <img src={adsImg} alt="광고 이미지"/>
    </AdsWrapper>
    </>
  )
}

const AdsWrapper=styled.div`
    width: 192rem;
    height: 23rem;

    overflow: hidden;
`