import { useState } from "react"
import styled from "styled-components"
import { TitleTextIc,ProducerCategoryTextIc,CategoryTextIc,HashtagTextIc,HoverPauseIc,HoverPlayIc } from "../../assets"
import tracks from '../../mocks/tracksListDummy.json'
import {showPlayerBar, playMusic,trackClicked} from "../../recoil/player"
import { useRecoilState } from "recoil";


export default function TrackList() {
    const [trackHover, setTrackHover] = useState<number>(-1)
    const [trackClick, setTrakClick] = useRecoilState<number>(trackClicked)

    const [showPlayer, setShowPlayer]=useRecoilState<boolean>(showPlayerBar)
    const [play, setPlay]=useRecoilState<boolean>(playMusic)

    function mouseOverTrack(id:number){
        setTrackHover(id)
    }

    function mouseOutTrack(){
        setTrackHover(-1)
    }

    function clickTrack(id:number){
        setTrakClick(id)
    }

    function clickThumbnailPauseIc(){
        setShowPlayer(true)
        setPlay(true)
    }

    function clickThumbnailPlayIc(){
        setPlay(false)
    }

  return (
    <TrackListContainer>
    <CategoryWrapper>
        <TitleTextIcon/>
        <ProducerCategoryTextIcon/>
        <CategoryTextIcon/>
        <HashtagTextIcon/>
    </CategoryWrapper>

    <TracksWrapper>
    {tracks.map((track)=>(
        <Tracks 
            key={track.beatId} 
            onMouseEnter={()=>mouseOverTrack(track.beatId)} 
            onMouseLeave={mouseOutTrack} 
            onClick={()=>clickTrack(track.beatId)} 
            showPlayer={showPlayer} 
            trackHoverBool={trackHover===track.beatId}
            trackClickBool={trackClick===track.beatId}
        >
        <TrackBox>
            {((!play&&(trackHover===track.beatId))||(!play&&showPlayer&&trackClick===track.beatId))&&<HoverPauseIcon onClick={clickThumbnailPauseIc}/>}
            {play&&(trackClick===track.beatId)&&<HoverPlayIcon onClick={clickThumbnailPlayIc}/>}
            <Thumbnail src={require('../../assets/image/'+ track.jacketImage + '.png')} alt="썸네일"/>
            <TrackText width={36.8}>{track.title}</TrackText>
            <TrackText width={21.3}>{track.producerName}</TrackText>
            <TrackText width={20.5}>{track.category}</TrackText>
        </TrackBox>
        {track.keyword.map((tag, idx)=>(<Tag key={idx}>#{tag}</Tag>))}
        </Tracks>
    ))}
    </TracksWrapper>
    </TrackListContainer>
  )
}

const TrackListContainer=styled.section`
`

const HoverPauseIcon=styled(HoverPauseIc)`
    position: absolute;
    z-index: 2;

    cursor: pointer;
`
const HoverPlayIcon=styled(HoverPlayIc)`
    position: absolute;
    z-index: 2;

    cursor: pointer;
`

const CategoryWrapper=styled.section`
    margin: 3.6rem 0 3.5rem 9rem;
`
const TitleTextIcon=styled(TitleTextIc)`
`

const ProducerCategoryTextIcon=styled(ProducerCategoryTextIc)`
    margin-left:43rem;
`

const CategoryTextIcon=styled(CategoryTextIc)`
    margin-left:10.7rem;
`

const HashtagTextIcon=styled(HashtagTextIc)`
    margin-left:10.7rem;
`

const TracksWrapper=styled.section`
    ${({ theme }) => theme.fonts.body1}
    color: ${({ theme }) => theme.colors.white};
`

const Tracks=styled.article<{showPlayer:boolean,trackHoverBool:boolean,trackClickBool:boolean}>`
    display: flex;
    align-items: center;

    width: 154.3rem;
    height: 12.1rem;

    margin-left: 6.6rem;
    margin-bottom: 0.7rem;

    border:0.15rem solid transparent;
    background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}), 
        linear-gradient(to right, ${({ trackHoverBool, trackClickBool, theme }) => (trackHoverBool||trackClickBool)&&(theme.colors.sub1)} 0%,  ${({ theme }) => theme.colors.sub3} 95%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    border-radius: 11.7rem 0 0 11.7rem;
`

const TrackBox=styled.div`
    display: flex;
    align-items: center;

    margin-left: 2.4rem;
`

const Thumbnail=styled.img`
    width: 8.3rem;
    height: 8.3rem;

    margin-right: 2.8rem;

    border-radius: 6.55rem;
`

const TrackText=styled.div<{width:number}>`
    width:${(props) => props.width}rem;
`

const Tag=styled.span`
    display: flex;
    align-items: center;

    height: 3.8rem;

    padding: 0.9rem 1.5rem;
    margin: 0 0.8rem 0 0;

    background: ${({ theme }) => theme.colors.gray4};
    border-radius: 21px;
`