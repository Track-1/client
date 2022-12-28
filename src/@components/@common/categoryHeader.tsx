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

    <HeaderContainer>
        <HeaderWrapper>
            <TrackOneIcon/>
            <ProfileWrapper>
                <img src={profileImgSrc} alt="프로필이미지"/>
                <ToggleIcon/>
            </ProfileWrapper>
        </HeaderWrapper>
    </HeaderContainer>
    </>
  )
}

const HeaderContainer=styled.header`
    display: flex;
    justify-content: center;

    height: 14.3rem;

    background-color: black;
`

const HeaderWrapper=styled.div`
    display: flex;
    justify-content: space-between;

    width: 178.7rem;
`

const TrackOneIcon=styled(Track1Icon)`
    margin-top: 4.1rem;
`

const CategoryContainer=styled.div`
    display: flex;
    justify-content: center;
`

const CategoryWrapper=styled.div`    
    display: flex;
    justify-content: space-between;

    position: absolute;
    z-index: 2;

    width: 27.9rem;
    margin-top:3.73rem;
`

const ProfileWrapper=styled.div`
    display: flex;
    align-items: center;
    
    & > img{
        margin-right: 1.29rem;

        border: 0.15rem solid white;
        border-radius: 2.4rem;
    }
`