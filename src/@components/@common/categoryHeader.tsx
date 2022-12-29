import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { ToggleIc, Track1Ic } from '../../assets'
import profileImg from '../../assets/image/profileImg.png'
import { ClickProps } from '../../type/headerProps'

export default function CategoryHeader({ isClicked }: ClickProps): JSX.Element {
    const navigate=useNavigate();

    const [tracksClicked, setTracksClicked] = useState<boolean>(isClicked)

    function tracksButtonClick(){
        setTracksClicked(true)
        navigate('/track-search')
    }

    function vocalsButtonClick(){
        setTracksClicked(false)
        navigate('/vocals')
    }
    
  return (
    <CategoryHeaderContainer>
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
                <img src={profileImg} alt="프로필이미지"/>
                <ToggleIc/>
            </ProfileWrapper>
        </HeaderWrapper>
    </HeaderContainer>
    </CategoryHeaderContainer>
  )
}

const CategoryHeaderContainer=styled.header`
    position: fixed;
    z-index: 10;

    width: 192rem;
    height: 14.3rem;

    padding-left: 7.5rem;

    background: linear-gradient(180deg, ${({ theme }) => theme.colors.sub3} 49.92%, rgba(0, 0, 0, 0) 105.16%, rgba(13, 14, 17, 0) 105.16%);
`

const HeaderContainer=styled.div`
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

    ${({ theme }) => theme.fonts.body1};
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