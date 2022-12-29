import styled from "styled-components"
import { TitleTextIc,ProducerCategoryTextIc,CategoryTextIc,HashtagTextIc } from "../../assets"

export default function TrackList() {
  return (
    <>
    <CategoryWrapper>
        <Title/>
        <Producer/>
        <Category/>
        <Hashtag/>
    </CategoryWrapper>
    </>
  )
}

const CategoryWrapper=styled.section`
    margin: 3.6rem 0 0 9rem;
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