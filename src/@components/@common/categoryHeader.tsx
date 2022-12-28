import styled from 'styled-components'

import { ToggleIcon, Track1Icon, BtnTracks, BtnVocals } from '../../assets/icon'
import profileImgSrc from '../../assets/image/profileImg.png'

export default function categoryHeader() {
  return (
    <>
    <CategoryContainer>
        <CategoryWrapper>
            <BtnTracks/>
            <BtnVocals/>
        </CategoryWrapper>
    </CategoryContainer>

    <HeaderWrapper>
        <TrackOneIcon/>
        <ProfileWrapper>
            <img src={profileImgSrc} alt="프로필이미지"/>
            <ToggleIcon/>
        </ProfileWrapper>
    </HeaderWrapper>
    </>
  )
}

const HeaderWrapper=styled.header`
    display: flex;
    justify-content: space-between;

    width: 192rem;
    height: 14.3rem;

    background-color: black;
    color: white;
`

const TrackOneIcon=styled(Track1Icon)`
    margin: 4.1rem 0 0 5.8rem;
`

const CategoryContainer=styled.div`
    display: flex;
    justify-content: center;
`

const CategoryWrapper=styled.div`
    margin-top:3.73rem;
    
    position: absolute;
    z-index: 2;
`

const ProfileWrapper=styled.div`
    display: flex;
    align-items: center;
    
    margin-right: 4.9rem;

    & > img{
        margin-right: 1.29rem;
    }
`