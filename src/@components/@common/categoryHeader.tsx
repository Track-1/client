import { useState } from 'react'
import styled from 'styled-components'

import { ToggleIc, Track1Ic } from '../../assets/icon'
import profileImgSrc from '../../assets/image/profileImg.png'

export default function CategoryHeader() {
    const [tracksClicked, setTracksClicked] = useState<boolean>(true)

    function tracksButtonClick(){
        setTracksClicked(true)
    }

    function vocalsButtonClick(){
        setTracksClicked(false)
    }
    
  return (
    <>
    <CategoryContainer>
        <CategoryWrapper>
            <TracksButton onClick={tracksButtonClick} tracksClicked={tracksClicked}>Tracks</TracksButton>
            <VocalsButton onClick={vocalsButtonClick} tracksClicked={tracksClicked}>Vocals</VocalsButton>
        </CategoryWrapper>
    </CategoryContainer>

    <HeaderContainer>
        <HeaderWrapper>
            <TrackOneIcon/>
            <ProfileWrapper>
                <img src={profileImgSrc} alt="프로필이미지"/>
                <ToggleIc/>
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
`

const HeaderWrapper=styled.div`
    display: flex;
    justify-content: space-between;

    width: 178.7rem;
`

const TrackOneIcon=styled(Track1Ic)`
    margin-top: 4.1rem;
`

const CategoryContainer=styled.div`
    display: flex;
    justify-content: center;
`

const CategoryWrapper=styled.div`    
    display: flex;

    position: absolute;
    z-index: 2;

    margin-top:6.65rem;

    ${({ theme }) => theme.fonts.title};
`

const TracksButton=styled.p<{tracksClicked:boolean}>`
    border-bottom: 0.15rem solid;
    border-bottom-color: ${({tracksClicked, theme})=>tracksClicked?(theme.colors.white):(theme.colors.sub3)};
    padding-bottom: 1rem;

    color:${({ tracksClicked, theme }) => tracksClicked?(theme.colors.white):(theme.colors.gray3)};

    cursor: pointer;
`

const VocalsButton=styled.p<{tracksClicked:boolean}>`
    margin-left: 7.368rem;

    border-bottom: 0.15rem solid;
    border-bottom-color: ${({tracksClicked, theme})=>!tracksClicked?(theme.colors.white):(theme.colors.sub3)};
    padding-bottom: 1rem;

    color:${({ tracksClicked, theme }) => !tracksClicked?(theme.colors.white):(theme.colors.gray3)};

    cursor: pointer;
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