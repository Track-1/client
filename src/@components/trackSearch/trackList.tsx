import styled from "styled-components"
import { TitleTextIc,ProducerCategoryTextIc,CategoryTextIc,HashtagTextIc } from "../../assets"
import tracks from '../../mocks/tracksListDummy.json'

export default function TrackList() {
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
        <Tracks>
        <div key={id}>
            <img src={require('../../assets/image/'+ imgSrc + '.png')} alt="썸네일"/>
            <div>{title}</div>
            <div>{producer}</div>
            <div>{category}</div>
        </div>
        {hashtags.map((tag, idx)=>(<Tag key={idx}>#{tag}</Tag>))}
        </Tracks>
    ))}
    </TracksWrapper>
    </TrackListContainer>
  )
}

const TrackListContainer=styled.section`
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

const Tracks=styled.article`
    display: flex;
    align-items: center;

    width: 154.3rem;
    height: 12.1rem;

    margin-left: 6.6rem;
    margin-bottom: 0.7rem;

    border:0.15rem solid transparent;
    background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}), 
    linear-gradient(to right, ${({ theme }) => theme.colors.sub1} 0%,  ${({ theme }) => theme.colors.sub3} 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    border-radius: 117px 0px 0px 117px;

    & > div{
        display: flex;
        align-items: center;

        margin-left: 2.4rem;

        & > img{
            width: 8.3rem;
            height: 8.3rem;

            border-radius: 6.55rem;
        }

        & > div:nth-child(2){
            width: 34.5rem;
            padding-left: 2.8rem;
        }

        & > div:nth-child(3){
            width: 21.3rem;
        }

        & > div:nth-child(4){
            width: 20.5rem;
        }


    }
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