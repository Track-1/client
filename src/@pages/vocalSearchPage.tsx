import styled from "styled-components";
import Filter from "../@components/@common/filter";
import VocalList from "../@components/vocalSearch/vocalList";
import TrackSearchHeader from "../@components/trackSearch/trackSearchHeader/trackSearchHeader";
import { useState } from "react";
import { PageType } from "../type/common/pageType";
import Header from "../@components/@common/header";

const Wrapper = styled.section`
  display: flex;
`;
export default function VocalSearchPage() {

  const [pageType, setPageType] = useState<PageType>("vocals");

  function changeType(pageType: PageType) {
    setPageType(pageType);
  }

  return (
    <>
      <Header homeLogo>
        <TrackSearchHeader pageType={pageType} changeType={changeType} />
      </Header>
      <Wrapper>
        <Filter pageType="vocals" />
        <VocalList />
      </Wrapper>
    </>
  );
}
