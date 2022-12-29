import styled from "styled-components"
import { TitleTextIc,ProducerCategoryTextIc,CategoryTextIc,HashtagTextIc } from "../../assets"
import tracks from '../../mocks/tracksListDummy.json'

export default function TrackList() {
  return (
    <>
    <CategoryWrapper>
        <Title/>
        <Producer/>
        <Category/>
        <Hashtag/>
    </CategoryWrapper>

    {tracks.map(({id, imgSrc, title, producer, category, hashtags})=>(
        <>
        <div key={id}>
            <img src={require('../../assets/image/'+ imgSrc + '.png')} alt="썸네일"/>
            {title}
            {producer}
            {category}
        </div>
        {hashtags.map((tag, idx)=>(<p key={idx}>{tag}</p>))}
        </>
    ))}
    </>
  )
}

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