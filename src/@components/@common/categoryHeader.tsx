import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { ToggleIc, Track1Ic, TracksSelectTextIc, VocalsSelectTextIc, TracksHeaderTextIc,VocalsHeaderTextIc } from '../../assets'
import profileImg from '../../assets/image/profileImg.png'
import { useRecoilState } from "recoil";
import {tracksOrVocalsCheck} from "../../recoil/tracksOrVocalsCheck"


export default function CategoryHeader() {
    const navigate=useNavigate();
    const [tracksOrVocals,setTracksOrVocals]=useRecoilState<string>(tracksOrVocalsCheck)

    function clickTracksButton(){
        setTracksOrVocals("Tracks")
        navigate('/track-search')
    }

    function clickVocalsButton(){
        setTracksOrVocals("Vocals")
        navigate('/vocals')
    }
    
  return (
    <CategoryHeaderContainer>
    <CategoryContainer>
        <CategoryWrapper>
            {tracksOrVocals==="Tracks"&&(
                <>
                <TracksSelectTextIcon onClick={clickTracksButton} />
                <VocalsHeaderTextIcon onClick={clickVocalsButton}/>
                </>
            )}
            {tracksOrVocals==="Vocals"&&(
                <>
                <TracksHeaderTextIcon onClick={clickTracksButton} />
                <VocalsSelectTextIcon onClick={clickVocalsButton}/>
                </>
            )}
        </CategoryWrapper>
    </CategoryContainer>

    <HeaderContainer>
        <HeaderWrapper>
            <TrackOneIcon/>
            <ProfileWrapper>
                <ProfileImg src={profileImg} alt="프로필이미지"/>
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

    /* padding-left: 5.8rem; */

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

const TracksSelectTextIcon=styled(TracksSelectTextIc)`
    cursor: pointer;
`

const TracksHeaderTextIcon=styled(TracksHeaderTextIc)`
    cursor: pointer;
`

const VocalsSelectTextIcon=styled(VocalsSelectTextIc)`
    margin-left: 7.368rem;

    cursor: pointer;
`

const VocalsHeaderTextIcon=styled(VocalsHeaderTextIc)`
    margin-left: 7.368rem;

    cursor: pointer;
`

const ProfileWrapper=styled.div`
    display: flex;
    align-items: center;
`

const ProfileImg=styled.img`
    margin-right: 1.29rem;

    border: 0.15rem solid white;
    border-radius: 2.4rem;
`