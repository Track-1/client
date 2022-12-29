import styled from "styled-components"

import CategoryHeader from "../@components/@common/categoryHeader"
import CategoryList from "../@components/trackSearch/categoryList"
import TrackListHeader from "../@components/trackSearch/trackListHeader"
import TrackList from "../@components/trackSearch/trackList"

export default function trackSearchPage() {
  return (
    <>
    <CategoryHeader isClicked={true}/>
    <TrackSearchPageWrapper>
      <article className="left-article">
      <CategoryList/>
      </article>
      <article className="right-article">
      <TrackListHeader/>
      <TrackList/>
      </article>
    </TrackSearchPageWrapper>
    </>
  )
}

const TrackSearchPageWrapper=styled.section`
  display: flex;

  & > .left-article{
    width: 32.1rem;
  }

  & > .right-article{
    width: 159.9rem;
  }
`