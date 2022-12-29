import styled from "styled-components"

export default function TrackList() {
  return (
    <>
    <CategoryWrapper>
        <p>Title</p>
        <p>Producer</p>
        <p>Category</p>
        <p>Hashtag</p>
    </CategoryWrapper>
    </>
  )
}

const CategoryWrapper=styled.section`
    display: flex;

    margin: 3.6rem 0 0 9rem;

    color:${({ theme }) => theme.colors.white};
`
