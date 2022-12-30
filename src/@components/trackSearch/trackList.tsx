import { useState } from "react"
import styled from "styled-components"
import { TitleTextIc,ProducerCategoryTextIc,CategoryTextIc,HashtagTextIc,HoverPauseIc } from "../../assets"
import tracks from '../../mocks/tracksListDummy.json'
import {showPlayerBar} from "../../recoil/showPlayerBar"
import { useRecoilState } from "recoil";


export default function TrackList() {
    const [trackhover, setTrackHover] = useState<boolean>(false)
    const [showPlayer, setShowPlayer]=useRecoilState<boolean>(showPlayerBar)

    function mouseOverTrackBox(){
        setTrackHover(true)
    }

    function mouseOutTrackBox(){
        setTrackHover(false)
    }

    function clickThumbnail(){
        setShowPlayer(true)
    }

  return (
    <TrackListContainer>
    <CategoryWrapper>
        <Title/>
        <Producer/>
        <Category/>
        <Hashtag/>
    </CategoryWrapper>

    <TracksWrapper>
    {tracks.map(({id, imgSrc, title, producer, category, hashtags})=>(
        <Tracks onMouseOver={mouseOverTrackBox} onMouseOut={mouseOutTrackBox} trackhover={trackhover}>
        <TrackBox key={id}>
            {trackhover&&<HoverPauseIcon onClick={clickThumbnail}/>}
            <Thumbnail src={require('../../assets/image/'+ imgSrc + '.png')} alt="썸네일"/>
            <TrackText width={31.5}>{title}</TrackText>
            <TrackText width={21.3}>{producer}</TrackText>
            <TrackText width={20.5}>{category}</TrackText>
        </TrackBox>
        {hashtags.map((tag, idx)=>(<Tag key={idx}>#{tag}</Tag>))}
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
`

const CategoryWrapper=styled.section`
    margin: 3.6rem 0 3.5rem 9rem;
`
const Title=styled(TitleTextIc)`
`

const Producer=styled(ProducerCategoryTextIc)`
    margin-left:38.1rem;
`

const Category=styled(CategoryTextIc)`
    margin-left:10.7rem;
`

const Hashtag=styled(HashtagTextIc)`
    margin-left:10.7rem;
`

const TracksWrapper=styled.section`
    ${({ theme }) => theme.fonts.body1}
    color: ${({ theme }) => theme.colors.white};
`

const Tracks=styled.article<{trackhover:boolean}>`
    display: flex;
    align-items: center;

    width: 154.3rem;
    height: 12.1rem;

    margin-left: 6.6rem;
    margin-bottom: 0.7rem;

    
    border:0.15rem solid transparent;

    background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}), 
    linear-gradient(to right, ${({ trackhover, theme }) => trackhover?(theme.colors.sub1):(theme.colors.sub3)} 0%,  ${({ theme }) => theme.colors.sub3} 95%);
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